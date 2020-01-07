import React, { Component } from 'react';
import { Paper, Typography, IconButton, CardContent, Card } from '@material-ui/core';
import Timer from './Timer';

export class TimerContainer extends Component {
	render() {
		return (
			<div style={{ flex: 1, minWidth: '375px' }}>
				<h3>CLOCK IT</h3>
				<Paper style={{ width: '97%', margin: '0 10px' }}>
					<br />
					<Timer />
					<br />
					<br />
					<IconButton />
				</Paper>
			</div>
		);
	}
}

export default TimerContainer;
