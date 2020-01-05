import React from 'react';
import {
	Card,
	CardContent,
	CardHeader,
	Typography,
	Icon,
	useTheme,
	createMuiTheme,
	ThemeProvider
} from '@material-ui/core';
import BugReportIcon from '@material-ui/icons/BugReport';

import './Motto.css';

const theme = createMuiTheme({
	typography: {
		fontFamily: [ '"Rock Salt"', '"Press Start 2P"', 'Permanent Marker', '"cursive"', 'Roboto', 'Arial', 'sans-serif' ].join(',')
	}
});

export default function Motto() {
	const { palette: { type, primary, secondary, error } } = useTheme();
	console.log('mounted');
	return (
		<ThemeProvider theme={theme}>
			<Card
				style={{
					height: '100%',
					backgroundColor: error.main,
					color: 'white',
                    paddingTop: '80px',
                    minWidth: '500px'
				}}
			>
				<Typography variant="h2">
					D E B U G
					<br />
					<BugReportIcon fontSize="inherit" className="logo bounce-7" />
					<br />
					D O C K E T
				</Typography>
				<br />
				<br />
				<CardContent>
					<BugReportIcon fontSize="large" className="bugs clockwise1" />
					<BugReportIcon fontSize="large" className="bugs counterclockwise1"/>
					<BugReportIcon fontSize="large" className="bugs clockwise2"/>
					<Typography variant="h5">say <span style={{ color: "white", fontSize: "1.5em"}}>'Hello World'</span> to your little friends</Typography>
					<BugReportIcon fontSize="large"  />
					<BugReportIcon fontSize="large" />
					<BugReportIcon fontSize="large" />
				</CardContent>
			</Card>
		</ThemeProvider>
	);
}
