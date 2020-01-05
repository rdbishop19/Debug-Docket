import React, { useEffect } from 'react';
import { Card, Typography, useTheme } from '@material-ui/core';
import { EntryContext } from '../providers/EntryProvider';
import { useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';

export default function StatsContainer() {
	const { userEntries } = React.useContext(EntryContext);

	const { palette: { type, primary, secondary, error } } = useTheme();

	const initialLegendOptions = {
		display: true,
		position: 'bottom',
		fullWidth: true,
		reverse: false,
		labels: {
			// fontColor: type === 'light' ? primary.main : secondary.main,
			fontFamily: 'Roboto',
			fontSize: 16,
			fontStyle: 'bold'
			// usePointStyle: true,
		}
	};

    // setup refs for accessing throughout component
	const totalClosed = useRef(0);
	const totalOpen = useRef(0);
	const totalSession = useRef(0);
	const totalBreak = useRef(0);
    const legendOptions = useRef(initialLegendOptions);
    
	const dataBugTotals = {
		labels: [ 'OPEN', 'CLOSED' ],
		datasets: [
			{
				data: [ totalOpen.current, totalClosed.current ],
				backgroundColor: [ error.main, secondary.main ],
				hoverBackgroundColor: [ error.dark, secondary.dark ],
				borderColor: 'none',
				borderWidth: 0
			}
		]
	};

	const dataSessionBreakTotals = {
		labels: [ 'SESSION', 'BREAK' ],
		datasets: [
			{
                // round 'data' values (original: milliseconds) for human-readable display format
				data: [ Math.floor(totalSession.current / 60000), Math.floor(totalBreak.current / 60000) ],
				backgroundColor: [ primary.light, secondary.light ],
				hoverBackgroundColor: [ primary.main, secondary.main ],
				borderColor: 'none',
				borderWidth: 0
			}
		]
	};

	const workDoughnutOptions = {
		maintainAspectRatio: true
		// title: {
		//     display: true,
		//     fontFamily: 'Roboto',
		//     fontSize: 16,
		//     text: ["SESSION v. BREAK TOTALS", "(minutes)"],
		// }
	};

    // calcuations: hours/minutes rounding for final display format
    // similar to display logic for timer minutes/seconds
	const sessionDisplayHours = Math.floor((totalSession.current % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	const sessionDisplayMinutes = Math.floor((totalSession.current % (1000 * 60 * 60)) / (1000 * 60));

	const breakDisplayHours = Math.floor((totalBreak.current % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	const breakDisplayMinutes = Math.floor((totalBreak.current % (1000 * 60 * 60)) / (1000 * 60));

	const totalDisplayHours = sessionDisplayHours + breakDisplayHours;
	const totalDisplayMinutes = sessionDisplayMinutes + breakDisplayMinutes;

    // this ratio determines what component to display to user if they are taking enough break time or not
	const sessionBreakRatio =
		totalSession.current > 0 && totalSession.current / (totalSession.current + totalBreak.current);

	const calculateTotals = () => {
        // # of bug entries still OPEN
		totalOpen.current = userEntries.reduce(function(acc, object) {
			if (!object.isCompleted) {
				return acc + 1;
			}
			return acc;
        }, 0);
        // # of bug entries that have been marked as COMPLETE
        totalClosed.current = userEntries.length - totalOpen.current;
        // amount of SESSION time spent on all bug entries
		totalSession.current = userEntries.reduce(function(acc, object) {
			return acc + object.totalWorkTime;
        }, 0);
        // amount of BREAK time spent on all bug entries
		totalBreak.current = userEntries.reduce(function(acc, object) {
			return acc + object.totalBreakTime;
		}, 0);
	};
	useEffect(calculateTotals, [ userEntries ]);

	return (
		<React.Fragment>
			<Card style={{ textAlign: 'center', margin: '0 10px', padding: '10px' }}>
				<div style={{ textAlign: 'center' }}>
					<Typography>
						Keep up the great work! <strong>#DevEveryDay</strong>
					</Typography>
					<Card style={{ padding: '10px', margin: '10px' }}>
						<Typography style={{ fontSize: '1.5em' }}>BUG TOTALS</Typography>
						<Doughnut
							data={dataBugTotals}
							legend={legendOptions.current}
							width={200}
							height={200}
							options={{ maintainAspectRatio: true }}
						/>
					</Card>
					<div style={{ width: '30%', minWidth: '120px', margin: '0 auto' }}>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<Typography>Open:</Typography>
							<Typography> {totalOpen.current}</Typography>
						</div>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<Typography>Closed:</Typography>
							<Typography> {totalClosed.current}</Typography>
						</div>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<Typography>Total:</Typography>
							<Typography> {userEntries.length}</Typography>
						</div>
					</div>
					<hr width="80%" />
					{sessionBreakRatio > 0.8333 ? (
						<React.Fragment>
							<Typography>Take frequent debugging breaks to stay sharp.</Typography>
							<Typography>
								<span
									style={{
										color: type === 'light' ? error.main : error.light,
										fontWeight: '900',
										fontSize: '1.4em'
									}}
								>
									{100 - Math.floor(sessionBreakRatio * 100)}%
								</span>{' '}
								of your time has been dedicated to breaks.
							</Typography>
						</React.Fragment>
					) : (
						<React.Fragment>
							<Typography>
								You have mastered the Art of the Break. <strong>#DevSourcerer</strong>
							</Typography>
							<Typography>
								<span
									style={{
										color: type === 'light' ? primary.main : secondary.main,
										fontWeight: '900',
										fontSize: '1.4em'
									}}
								>
									{100 - Math.floor(sessionBreakRatio * 100)}%
								</span>{' '}
								of your time has been dedicated to breaks.
							</Typography>
						</React.Fragment>
					)}
					<Card style={{ padding: '10px', margin: '10px' }}>
						<Typography style={{ fontSize: '1.5em' }}>SESSION v. BREAK TOTALS (minutes)</Typography>
						<Doughnut
							data={dataSessionBreakTotals}
							legend={legendOptions.current}
							width={200}
							height={200}
							options={workDoughnutOptions}
						/>
					</Card>
					<div style={{ width: '40%', minWidth: '160px', margin: '0 auto' }}>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<Typography>Session Time:</Typography>
							<Typography>
								{sessionDisplayHours}h {sessionDisplayMinutes}m
							</Typography>
						</div>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<Typography>Break Time:</Typography>
							<Typography>
								{breakDisplayHours}h {breakDisplayMinutes}m
							</Typography>
						</div>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<Typography>Total:</Typography>
							<Typography>
								{totalDisplayHours}h {totalDisplayMinutes}m
							</Typography>
						</div>
					</div>
				</div>
			</Card>
		</React.Fragment>
	);
}
