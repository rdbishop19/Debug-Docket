import React, { useState, useEffect, useRef } from 'react';
import { Card, Typography, IconButton } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

export default function Timer() {
	// get current remaining timer
	const storedTimer = localStorage.getItem('timer');
	// get storedRefTime that timer was 'stopped'
	const storedRefTimer = parseInt(localStorage.getItem('stopped'));
	// check if timer was paused or running when unmounted
	const storedState = localStorage.getItem('state');
	// logic for calculating resume timer
	const storedMode = localStorage.getItem('mode')
	
	let resumeTimer =
	storedRefTimer && storedState !== 'paused'
	? storedTimer - (new Date().getTime() - storedRefTimer)
	: storedTimer;
	
	const [ timer, setTimer ] = useState(storedTimer ? resumeTimer : 180000);
	const [ mode, setMode ] = useState(storedMode ? storedMode : "session")
	const storeTimer = useRef(resumeTimer !== null ? storedTimer : timer);
	const storeState = useRef(storedState !== null ? storedState : 'paused');
	const storeMode = useRef(storedMode !== null ? storedMode : 'session')
	
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
			if (mode === "session"){
				if (Notification.permission === 'granted'){
					new Notification("Take a break! You earned it.")
				}
				setMode("break")
				document.title = 'Break time!';
				setTimer(300000);
			}
			else {
				if (Notification.permission === 'granted'){
					new Notification("Break time over. Start a new bug tracking session with the timer.")
				}
				setMode("session")
				document.title = 'Debug Docket'
				setActive(!active);
				setTimer(1500000)
			}
			return;
		}
		if (active) {
			document.title = `${minutes >= 10 ? minutes : '0' + minutes}:${seconds >= 10 ? seconds : '0' + seconds} ${mode}`;
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
			const mode = storeMode.current
			localStorage.setItem('timer', storeTimer.current);
			localStorage.setItem('state', storeState.current);
			localStorage.setItem('mode', mode);
			localStorage.setItem('stopped', new Date().getTime());
		};
	}, []);
	
	function increment() {
		setActive(false);
		// this floor logic allows the adding of minutes to always round down the seconds
		const newTimer = Math.floor((timer + 60000) / 60000) * 60000;
		setTimer(newTimer);
	}
	function decrement() {
		setActive(false);
		// this ceil logic keeps the minutes even for same effect as increment
		const newTimer = Math.ceil((timer - 60000) / 60000) * 60000;
		// prevent negative timer
		if (newTimer > 0) {
			setTimer(newTimer);
		}
	}
	
	function toggle() {
		// about to change state from active to inactive, so set state as 'paused' for localStorage
		if (active) {
			storeState.current = 'paused';
		} else storeState.current = 'started';
		setActive(!active);
	}

	return (
		<Card>
			<Typography component="h2" variant="h6">
				{mode === "session" && 'Session:'}
				{mode === "break" && 'Break:'}
			</Typography>
			{timer > 0 ? (
				<Typography component="h3" variant="h3">
					{minutes >= 10 ? minutes : '0' + minutes}
					{':'}
					{seconds >= 10 ? seconds : '0' + seconds}
				</Typography>
			) : (
				<Typography component="h3" variant="h3">
					00:00
				</Typography>
			)}
			<br />
			<Typography>Elapsed Time:</Typography>
			<Typography component="h3" variant="h4">
				{elapsedMinutes > 0 ? elapsedMinutes : '00'}
				{':'}
				{elapsedSeconds >= 10 ? elapsedSeconds : '0' + elapsedSeconds}
			</Typography>
			{active ? (
				<IconButton onClick={toggle}>
					<PauseIcon />
				</IconButton>
			) : (
				<IconButton onClick={toggle}>
					<PlayArrowIcon />
				</IconButton>
			)}
			<br />
			<IconButton onClick={increment}>
				<AddIcon />
			</IconButton>
			<IconButton onClick={decrement}>
				<RemoveIcon />
			</IconButton>
		</Card>
	);
}
