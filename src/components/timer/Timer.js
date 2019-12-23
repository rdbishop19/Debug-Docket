import React, { useContext, useEffect } from 'react';
import { Card, Typography, IconButton, Input, CardContent, Tooltip, Grid, Button } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
// import UpdateIcon from '@material-ui/icons/Update';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';

import { TimerContext } from '../providers/TimerProvider';

export default function Timer() {
	const {
		timer,
		elapsedTime,
		sessionTime,
		breakTime,
		incrementBreak,
		decrementBreak,
		increment,
		decrement,
		mode,
		active,
		toggle,
		restartBreak,
		resetTimers,
	} = useContext(TimerContext);

	const minutes = Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((timer % (1000 * 60)) / 1000);

	const elapsedMinutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
	const elapsedSeconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

	// useEffect(() => {

	// }, [ active, timer ]);

	return (
		<Card style={{ width: '50%', margin: '0 auto', backgroundColor: mode === 'session' ? 'salmon' : 'aquamarine' }}>
			<CardContent>
				<Typography component="h3" variant="h3">
					<Card>
						<Typography component="h2" variant="h6">
							{mode === 'session' && 'SESSION'}
							{mode === 'break' && 'BREAK'}
						</Typography>
						{timer > 0 ? (
							<Tooltip title="Click to start/stop" aria-label="start-stop" placement="bottom">
								<Typography component="h3" variant="h1" onClick={toggle} style={{ cursor: 'pointer' }}>
									{minutes >= 10 ? minutes : '0' + minutes}
									{':'}
									{seconds >= 10 ? seconds : '0' + seconds}
								</Typography>
							</Tooltip>
						) : (
							<Typography component="h3" variant="h3">
								00:00
							</Typography>
						)}
						<Tooltip title="Restart break" aria-label="restart-break" placement="left">
							<IconButton
								style={{ visibility: mode === 'break' ? 'visible' : 'hidden' }}
								size="small"
								onClick={restartBreak}
							>
								<SkipPreviousIcon />
							</IconButton>
						</Tooltip>
						{active ? (
							<Tooltip title="Pause" aria-label="pause" placement="right">
								<Button variant="outlined" color="default" onClick={toggle} size="large">
									<PauseIcon />
								</Button>
							</Tooltip>
						) : (
							<Tooltip title="Play" aria-label="play" placement="left">
								<Button variant="contained" color="primary" onClick={toggle} size="large">
									<PlayArrowIcon />
								</Button>
							</Tooltip>
						)}
						<Tooltip title="Skip break" aria-label="skip" placement="right">
							<IconButton
								style={{ visibility: mode === 'break' ? 'visible' : 'hidden' }}
								size="small"
								onClick={resetTimers}
							>
								<SkipNextIcon />
							</IconButton>
						</Tooltip>
						<br />
						<Typography>Elapsed Time:</Typography>
						<Typography component="h3" variant="h4">
							{elapsedMinutes > 0 ? elapsedMinutes : '00'}
							{':'}
							{elapsedSeconds >= 10 ? elapsedSeconds : '0' + elapsedSeconds}
						</Typography>
						<Button variant="outlined" size="small" onClick={resetTimers}>
							Reset
						</Button>
						<div style={{ display: 'flex', textAlign: 'center', justifyContent: 'space-around' }}>
							<Card style={{ margin: '5px', flex: 1 }}>
								<Grid container spacing={0}>
									<Grid item xs={3}>
										<IconButton onClick={increment} size="small" edge="start">
											<AddIcon color="primary" />
										</IconButton>
									</Grid>
									{/* <Input /> */}
									<Grid container item xs={6}>
										<div style={{ width: '100%' }}>
											<Typography variant="h3"
														style={{ margin: '10px auto', verticalAlign: 'center' }}>
												{sessionTime / 60000}
											</Typography>
										</div>
									</Grid>
									<Grid item xs={3}>
										<IconButton onClick={decrement} size="small" edge="end">
											<RemoveIcon color="secondary" />
										</IconButton>
									</Grid>
									<Grid item xs={12}>
										<Typography variant="subtitle1" component="p">
											SESSION
										</Typography>
									</Grid>
								</Grid>
							</Card>
							<Card style={{ margin: '5px', flex: 1 }}>
								<Grid container spacing={0}>
									<Grid item xs={3}>
										<IconButton onClick={incrementBreak} size="small">
											<AddIcon color="primary" />
										</IconButton>
									</Grid>
									{/* <Input value={breakTime}/> */}
									<Grid item xs={6}>
										<div style={{ width: '100%' }}>
											<Typography variant="h3"
												style={{ margin: '10px auto', verticalAlign: 'center' }}>
												{breakTime / 60000}
											</Typography>
										</div>
									</Grid>
									<Grid item xs={3}>
										<IconButton onClick={decrementBreak} size="small">
											<RemoveIcon color="secondary" />
										</IconButton>
									</Grid>
									<Grid item xs={12}>
										<Typography variant="subtitle1" component="p">
											BREAK
										</Typography>
									</Grid>
								</Grid>
							</Card>
						</div>
					</Card>
				</Typography>
			</CardContent>
		</Card>
	);
}
