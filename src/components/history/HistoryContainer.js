import React, { useEffect, useState, useRef } from 'react';
import { EntryContext } from '../providers/EntryProvider';
import { UserContext } from '../providers/UserProvider';
import HistoryList from './HistoryList';
import { Input, Typography, Button, Grid, Card, useTheme } from '@material-ui/core';
import Dropdowns from '../inputform/Dropdowns';
import { Doughnut } from 'react-chartjs-2';

export default function HistoryContainer(props) {
	const { entries, userEntries, getUserEntries, deleteEntry } = React.useContext(EntryContext);
	const { getLoggedInUser } = React.useContext(UserContext);
	const [ searchTerm, setSearchTerm ] = useState('');

	const theme = useTheme();
	const { palette: { type, primary, secondary, error } } = theme;

	const inputStyle = {
		color: type === 'light' ? 'primary' : 'secondary'
	};

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
	const totalClosed = useRef(0);
	const totalOpen = useRef(0);
	const totalSession = useRef(null);
	const totalBreak = useRef(0);
	const legendOptions = useRef(initialLegendOptions);

	const initialFilter = {
		isCompleted: false,
		priority: {
			id: '',
			label: 'n/a'
		},
		severity: {
			id: '',
			label: 'n/a'
		},
		category: {
			id: '',
			label: 'none'
		}
	};
	const [ filter, setFilter ] = useState(initialFilter);
	const { priority, severity, category } = filter;

	const activeUser = getLoggedInUser();
	const [ filteredEntries, setFilteredEntries ] = useState([]);

	const handleChange = (e) => {
		setSearchTerm(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const handleRadioChange = (e) => {
		setFilter({ ...filter, [e.target.name]: { id: Number(e.target.value) } });
		// console.log('filter', filter)
	};

	const clearFilters = () => {
		// setFilter(initialFilter)
		setFilteredEntries(userEntries);
	};

	const deleteHistoryEntry = (id) => {
		if (window.confirm('Delete this entry?')) {
			deleteEntry(id).then(getUserEntries);
		}
	};
	// const filterClosedEntries = (total, entry) {
	//     if (entry.isCompleted){
	//         return total + 1
	//     }
	// }
	// for when user selects radio dropdowns
	useEffect(
		() => {
			// console.log('filtering')
			//reset list each time
			setFilteredEntries(userEntries);
			const filteredEntries = userEntries.filter((item) => {
				const { severity, priority, category } = filter;
				const { severityId, priorityId, categoryId } = item;
				const severityMatch = severity.id === severityId && severity.id !== '';
				const priorityMatch = priority.id === priorityId && priority.id !== '';
				const categoryMatch = category.id === categoryId && category.id !== '';
				return severityMatch && priorityMatch && categoryMatch;
			});
			// console.log('filteredEntries', filteredEntries)
			setFilteredEntries(filteredEntries);
		},
		[ filter ]
	);

	useEffect(
		() => {
			// console.log('useEffect')
			setFilteredEntries(userEntries);
			const filteredEntries = userEntries.filter((entry) => {
				const searchLower = searchTerm.toLowerCase();
				const title = entry.title.toLowerCase();
				const description = entry.description.toLowerCase();
				return title.includes(searchLower) || description.includes(searchLower);
			});
			setFilteredEntries(filteredEntries);
		},
		[ activeUser.id, entries, userEntries, searchTerm ]
	);

	useEffect(
		() => {
			getUserEntries(activeUser.id).then(setFilteredEntries);
			// eslint-disable-next-line react-hooks/exhaustive-deps
		},
		[ activeUser.id ]
	);

	useEffect(
		() => {
			totalOpen.current = userEntries.reduce(function(acc, object) {
				if (!object.isCompleted) {
					return acc + 1;
				}
				return acc;
			}, 0);
			totalClosed.current = userEntries.length - totalOpen.current;
			totalSession.current = userEntries.reduce(function(acc, object) {
				return acc + object.totalWorkTime;
			}, 0);
			totalBreak.current = userEntries.reduce(function(acc, object) {
				return acc + object.totalBreakTime;
			}, 0);
		},
		[ userEntries ]
	);

	const data = {
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

	const workDoughnutOptions = {
		maintainAspectRatio: true
		// title: {
		//     display: true,
		//     fontFamily: 'Roboto',
		//     fontSize: 16,
		//     text: ["SESSION v. BREAK TOTALS", "(minutes)"],
		// }
	};

	const data2 = {
		labels: [ 'SESSION', 'BREAK' ],
		datasets: [
			{
				data: [ Math.floor(totalSession.current / 60000), Math.floor(totalBreak.current / 60000) ],
				backgroundColor: [ primary.light, secondary.light ],
				hoverBackgroundColor: [ primary.main, secondary.main ],
				borderColor: 'none',
				borderWidth: 0
			}
		]
	};

	const sessionDisplayHours = Math.floor((totalSession.current % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	const sessionDisplayMinutes = Math.floor((totalSession.current % (1000 * 60 * 60)) / (1000 * 60));

	const breakDisplayHours = Math.floor((totalBreak.current % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	const breakDisplayMinutes = Math.floor((totalBreak.current % (1000 * 60 * 60)) / (1000 * 60));

	// const totalTime = totalSession.current + totalBreak.current
	const totalDisplayHours = sessionDisplayHours + breakDisplayHours;
	const totalDisplayMinutes = sessionDisplayMinutes + breakDisplayMinutes;

	const sessionBreakRatio =
		totalSession.current && totalSession.current / (totalSession.current + totalBreak.current);

	return (
		<Grid container spacing={1}>
			<Grid item xs={6} sm={3}>
				{/* <React.Fragment> */}
				<Typography variant="h6" component="h3" style={{ textAlign: 'center' }}>
					SEARCH
				</Typography>
				<Card style={{ textAlign: 'center', margin: '0 10px', padding: '10px' }}>
					<form onSubmit={handleSubmit}>
						<Input
							placeholder="Search entries by keyword"
							value={searchTerm}
							onChange={handleChange}
							style={{ width: '100%' }}
							color={inputStyle.color}
						/>
					</form>
					<br />
				</Card>
				<Typography variant="h6" component="h3" style={{ textAlign: 'center' }}>
					FILTER
				</Typography>
				<Card
					style={{
						textAlign: 'center',
						margin: '0 10px',
						height: '400px',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-around',
						padding: '10px'
					}}
				>
					<Dropdowns
						priority={priority}
						severity={severity}
						category={category}
						handleRadioChange={handleRadioChange}
					/>
					<br />
					<Button variant="contained" color="secondary" onClick={clearFilters}>
						Clear Filters
					</Button>
				</Card>
				{/* <br /> */}
				{/* <br /> */}
			</Grid>
			<Grid item xs={6} sm={6}>
				<Typography variant="h6" component="h3" style={{ textAlign: 'center' }}>
					BUG HISTORY
				</Typography>
				<HistoryList
					entries={filteredEntries}
					isFiltering={userEntries > filteredEntries}
					activeUser={activeUser}
					deleteHistoryEntry={deleteHistoryEntry}
					{...props}
				/>
			</Grid>
			<Grid item xs={6} sm={3}>
				<Typography variant="h6" style={{ textAlign: 'center' }}>
					STATS
				</Typography>
				<Card style={{ textAlign: 'center', margin: '0 10px', padding: '10px' }}>
					<div style={{ textAlign: 'center' }}>
						<Typography>Keep up the great work! #DevEveryDay</Typography>
						<Card style={{ padding: '10px', margin: '10px' }}>
							<Typography style={{ fontSize: '1.5em' }}>BUG TOTALS</Typography>
							<Doughnut
								data={data}
								legend={legendOptions.current}
								width={200}
								height={200}
								options={{ maintainAspectRatio: true }}
							/>
						</Card>
						<Typography>Open: {totalOpen.current}</Typography>
						<Typography>Closed: {totalClosed.current}</Typography>
						<Typography>Total: {userEntries.length}</Typography>
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
								<Typography>You have mastered the Art of the Break. #DevSourcerer</Typography>
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
								data={data2}
								legend={legendOptions.current}
								width={200}
								height={200}
								options={workDoughnutOptions}
							/>
						</Card>
						<Typography>
							Session Time: {sessionDisplayHours}h {sessionDisplayMinutes}m
						</Typography>
						<Typography>
							Break Time: {breakDisplayHours}h {breakDisplayMinutes}m
						</Typography>
						<Typography>
							Total: {totalDisplayHours}h {totalDisplayMinutes}m
						</Typography>
					</div>
				</Card>
			</Grid>
			{/* </React.Fragment> */}
		</Grid>
	);
}
