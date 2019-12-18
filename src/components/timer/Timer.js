import React, { useState, useEffect, useRef } from 'react';
import { Card, Typography, IconButton } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

export default function Timer() {
	// const minute = 60000
	// const second = 1000

	const [ timer, setTimer ] = useState(180000);
	const [ active, setActive ] = useState(false);
	const [ elapsedTime, setElapsedTime ] = useState(0);
	//https://dev.to/rbreahna/javascript-timer-with-react-hooks-560m
    const [ timeDelay, setTimeDelay ] = useState(1);
    
	const initialTime = useRef();
	const endTime = useRef();

	useEffect(
		() => {
			const minutes = Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((timer % (1000 * 60)) / 1000);
			document.title = `${minutes >= 10 ? minutes : `0${minutes}`}:${seconds >= 10 ? seconds : `0${seconds}`}`;

			const timeInterval = 1000; //milliseconds
			if (timer <= 0 && active) {
				document.title = 'Break time!';
				setActive(!active);
				setTimer(180000);
				return;
			}
			if (active) {
				// baseline to compare to
				initialTime.current = new Date().getTime();
				// future time to subtract current 'timer' from initialTime
				endTime.current = initialTime.current + timer;

				const interval = setInterval(() => {
					
					// current time when this interval fired
                    const currentTime = new Date().getTime();
                    // drift between 
                    const delay = currentTime - initialTime.current;
                    setTimer(timer => timer - (currentTime - initialTime.current));
                    setElapsedTime(elapsedTime => elapsedTime + delay);
                    // console.log('elapsedTime', elapsedTime)
                    // console.log('delay', delay)
                    // set initialTime
					initialTime.current = currentTime;
					// console.log('newTimer', newTimer);
                    
					// setTimeDelay(delay / 1000);
                    // console.log('timeDelay', timeDelay);
                    
					// console.log('timer', timer / timeInterval);
				}, timeInterval);

				return () => clearInterval(interval);
			}
		},
		[ active, timer, timeDelay ]
	);

	function increment() {
		setActive(false);
		const newTimer = Math.floor((timer + 60000) / 60000) * 60000;
		setTimer(newTimer);
	}
	function decrement() {
		setActive(false);
		const newTimer = Math.ceil((timer - 60000) / 60000) * 60000;
		if (newTimer > 0) {
			setTimer(newTimer);
		}
	}

	function toggle() {
		setActive(!active);
	}

	const minutes = Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((timer % (1000 * 60)) / 1000);
	const milliseconds = Math.floor(timer % 1000);

	const elapsedMinutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
	const elapsedSeconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
	const elapsedMilliseconds = Math.floor(elapsedTime % 1000);

	return (
		<Card>
            <Typography component="h2" variant="h6">Session:</Typography>
			{timer > 0 ? (
				<Typography component="h3" variant="h3">
					{minutes >= 10 ? minutes : `0${minutes}`}:
					{seconds >= 10 ? seconds : `0${seconds}`}
					.{milliseconds >= 100 ? milliseconds : `00${milliseconds}`}
				</Typography>
			) : (
				<Typography component="h3" variant="h3">00:00</Typography>
			)}
            <br/>
			<Typography>Elapsed Time:</Typography>
			<Typography component="h3" variant="h4">
				{elapsedMinutes > 0 ? elapsedMinutes : '00'}:
				{elapsedSeconds >= 10 ? elapsedSeconds : `0${elapsedSeconds}`}
				.{elapsedMilliseconds >= 100 ? elapsedMilliseconds : `00${elapsedMilliseconds}`}
			</Typography>
            {active ?   <IconButton onClick={toggle}>
                            <PauseIcon />
                        </IconButton>
                    :
                        <IconButton onClick={toggle}>
                            <PlayArrowIcon />
                        </IconButton>
            }
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
