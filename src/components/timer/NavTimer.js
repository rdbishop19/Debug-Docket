import React, { useContext } from 'react';
import { TimerContext } from '../providers/TimerProvider';
import { Card, Typography, Tooltip, Button, IconButton, useTheme } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import TimerIcon from '@material-ui/icons/Timer';

import '../timer/Timer.css'

export default function NavTimer() {
	const { timer, mode, active, toggle } = useContext(TimerContext);

	const minutes = Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((timer % (1000 * 60)) / 1000);

	const theme = useTheme();
	const { palette: { type, error /* primary, secondary, error */ } } = theme;

	return (
		<React.Fragment>
			<Tooltip title={active ? 'Timer running' : 'Timer paused'}>
				<TimerIcon style={{ margin: '0 5px', color: active ? error.main : 'white' }} />
			</Tooltip>
			<Typography>
				{mode === 'session' && 'SESSION'}
				{mode === 'break' && 'BREAK'}
			</Typography>
			{active ? (
				<Tooltip title="Pause" aria-label="pause">
					<IconButton variant="outlined" color="default" onClick={toggle} size="small" >
						<PauseIcon />
					</IconButton>
				</Tooltip>
			) : (
				<Tooltip title="Resume" aria-label="resume-timer">
					<IconButton variant="outlined" color="secondary" onClick={toggle} size="small">
						<PlayArrowIcon />
					</IconButton>
				</Tooltip>
			)}
			{timer > 0 ? (
				<Tooltip title="Current Timer" aria-label="current-timer" placement="bottom">
					<Typography onClick={toggle} style={{ cursor: 'pointer' }}>
						{minutes >= 10 ? minutes : '0' + minutes}
						{':'}
						{seconds >= 10 ? seconds : '0' + seconds}
					</Typography>
				</Tooltip>
			) : (
				<Typography>00:00</Typography>
			)}
		</React.Fragment>
	);
}
