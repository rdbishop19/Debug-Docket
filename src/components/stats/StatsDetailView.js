import React from 'react';
import { useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useTheme, Card, Typography } from '@material-ui/core';

export default function StatsDetailView({ entry }) {
	const { totalWorkTime, totalBreakTime } = entry;
	const { palette: { type, primary, secondary, error } } = useTheme();

	const initialLegendOptions = {
		display: true,
		position: 'left',
		fullWidth: false,
		reverse: false,
		labels: {
			maintainAspectRatio: true,
			// fontColor: type === 'light' ? primary.main : secondary.main,
			fontFamily: 'Roboto',
			// fontSize: 16,
			fontStyle: 'bold'
			// usePointStyle: true,
        },
    };
    
    const dataOptions = {
        title: {
            display: true,
            fontFamily: 'Roboto',
            fontSize: 16,
            text: ["TIME TOTALS (minutes)"],
        },
        maintainAspectRatio: false,
    }

	const bugTimeTotals = {
		labels: [ 'SESSION', 'BREAK' ],
		datasets: [
			{
				// round 'data' values (original: milliseconds) for human-readable display format
				data: [ Math.floor(totalWorkTime / 60000), Math.floor(totalBreakTime / 60000) ],
				backgroundColor: [ primary.light, secondary.light ],
				hoverBackgroundColor: [ primary.main, secondary.main ],
				borderColor: 'none',
				borderWidth: 0
			}
		]
	};
	return (
		<Card style={{ height: "250px", width: '50%', padding: '5px', textAlign: 'center' }}>
            {/* <Typography style={{ padding: "0px" }}>SESSION v. BREAK TIME (minutes)</Typography> */}
			<Doughnut
				data={bugTimeTotals}
				legend={initialLegendOptions}
				// width={50}
				// height={50}
				options={dataOptions}
			/>
		</Card>
	);
}
