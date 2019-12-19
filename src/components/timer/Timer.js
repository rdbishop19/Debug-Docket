import React, { useState, useEffect, useRef } from 'react';
import { Card, Typography, IconButton, Input, CardContent, Tooltip, Grid, Button } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import UpdateIcon from '@material-ui/icons/Update';

export default function Timer() {
	// get current remaining timer
	const storedTimer = localStorage.getItem('timer');
	// get storedRefTime that timer was 'stopped'
	const storedRefTimer = parseInt(localStorage.getItem('stopped'));
	// check if timer was paused or running when unmounted
	const storedState = localStorage.getItem('state');
	// logic for calculating resume timer
	const storedMode = localStorage.getItem('mode');

	let resumeTimer =
		storedRefTimer && storedState !== 'paused'
			? storedTimer - (new Date().getTime() - storedRefTimer)
			: storedTimer;

	const defaultTimer = 1500000;
	const [ timer, setTimer ] = useState(storedTimer ? resumeTimer : 180000); // change to 1500000 when done testing (25 minutes)
	const [ sessionTime, setSessionTime ] = useState(defaultTimer);
	const [ breakTime, setBreakTime ] = useState(300000);
	const [ mode, setMode ] = useState(storedMode ? storedMode : 'session');
	const storeTimer = useRef(resumeTimer !== null ? storedTimer : timer);
	const storeState = useRef(storedState !== null ? storedState : 'paused');
	const storeMode = useRef(storedMode !== null ? storedMode : 'session');

	const [ active, setActive ] = useState(storedState === 'paused' ? false : true);
	const [ elapsedTime, setElapsedTime ] = useState(0);
	//https://dev.to/rbreahna/javascript-timer-with-react-hooks-560m
	// const [ timeDelay, setTimeDelay ] = useState(1);

	const initialTime = useRef();
	const endTime = useRef();

	const minutes = Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((timer % (1000 * 60)) / 1000);
	// const milliseconds = Math.floor(timer % 1000);

	const elapsedMinutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
	const elapsedSeconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
	// const elapsedMilliseconds = Math.floor(elapsedTime % 1000);

	function updateTimer() {
		// const minutes = Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60));
		// const seconds = Math.floor((timer % (1000 * 60)) / 1000);

		// const timeInterval = 1000; //milliseconds
		if (timer <= 0 && active) {
			if (mode === 'session') {
				if (Notification.permission === 'granted') {
					new Notification('Take a break! You earned it.');
				}
				setMode('break');
				document.title = 'Break time!';
				setTimer(breakTime);
			} else {
				if (Notification.permission === 'granted') {
					new Notification('Break time over. Start a new bug tracking session with the timer.');
				}
				setMode('session');
				document.title = 'Debug Docket';
				setActive(!active);
				setTimer(sessionTime);
			}
			return;
		}
		if (active) {
			document.title = `${minutes >= 10 ? minutes : '0' + minutes}:${seconds >= 10
				? seconds
				: '0' + seconds} ${mode}`;
			// baseline to compare to
			initialTime.current = new Date().getTime();
			// future time to subtract current 'timer' from initialTime
			endTime.current = initialTime.current + timer;

			const interval = setInterval(() => {
				// current time when this interval fired
				const currentTime = new Date().getTime();
				// drift between
				const delay = currentTime - initialTime.current;
				setTimer((timer) => timer - delay);
				setElapsedTime((elapsedTime) => elapsedTime + delay);
				storeTimer.current = timer;
			}, 1000);

			return () => {
				clearInterval(interval);
			};
		}
	}

	useEffect(updateTimer, [ active, timer ]);

	// save localStorage settings when component unmounts
	useEffect(() => {
		return () => {
			const mode = storeMode.current;
			localStorage.setItem('timer', storeTimer.current);
			localStorage.setItem('state', storeState.current);
			localStorage.setItem('mode', mode);
			localStorage.setItem('stopped', new Date().getTime());
		};
	}, []);

	function increment() {
		// setActive(false);
		// this floor logic allows the adding of minutes to always round down the seconds
		const newTimer = Math.floor((sessionTime + 60000) / 60000) * 60000;
		// setTimer(newTimer);
		setSessionTime(newTimer);
	}
	function decrement() {
		// setActive(false);
		// this ceil logic keeps the minutes even for same effect as increment
		const newTimer = Math.ceil((sessionTime - 60000) / 60000) * 60000;
		// prevent negative timer
		if (newTimer > 0) {
			// setTimer(newTimer);
			setSessionTime(newTimer);
		}
	}

	function incrementBreak() {
		// setActive(false)
		const newBreak = Math.floor((breakTime + 60000) / 60000) * 60000;
		setBreakTime(newBreak);
	}
	function decrementBreak() {
		// setActive(false)
		const newBreak = Math.floor((breakTime - 60000) / 60000) * 60000;
		if (newBreak > 0) {
			setBreakTime(newBreak);
		}
	}

	function resetTimers() {
		setActive(false);
		setMode('session');
		setTimer(sessionTime);
		setBreakTime(breakTime);
	}

	function toggle() {
		// about to change state from active to inactive, so set state as 'paused' for localStorage
		if (active) {
			storeState.current = 'paused';
		} else storeState.current = 'started';
		setActive(!active);
	}
	function handleClick(){
		console.log('clicked')

	}

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
								<Typography component="h3" variant="h1" onClick={toggle} style={{ cursor: "pointer" }}>
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
											<Typography
												variant="h3"
												// style={{ margin: '10px auto', verticalAlign: 'center' }}
											>
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
											<Typography
												variant="h3"
												// style={{ margin: '10px auto', verticalAlign: 'center' }}
											>
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
