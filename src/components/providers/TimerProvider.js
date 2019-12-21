import React, { useState, useRef, useEffect } from 'react';

export const TimerContext = React.createContext();

export const TimerProvider = (props) => {
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

	const initialTime = useRef();
	const endTime = useRef();

	const minutes = Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((timer % (1000 * 60)) / 1000);
	// const milliseconds = Math.floor(timer % 1000);
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
	function resetTimers() {
		setActive(false);
		setMode('session');
		setTimer(sessionTime);
		setBreakTime(breakTime);
	}

	function restartBreak() {
		setMode('break');
		// setBreakTime(breakTime)
		setTimer(breakTime);
	}

	function toggle() {
		// about to change state from active to inactive, so set state as 'paused' for localStorage
		if (active) {
			storeState.current = 'paused';
		} else storeState.current = 'started';
		setActive(!active);
	}

	const saveTimerToLocalStorage = () => {
		const mode = storeMode.current;
		localStorage.setItem('timer', storeTimer.current);
		localStorage.setItem('state', storeState.current);
		localStorage.setItem('mode', mode);
		localStorage.setItem('stopped', new Date().getTime());
	};

	useEffect(updateTimer, [ active, timer ]);

	useEffect(() => {
		return () => {
			saveTimerToLocalStorage();
		};
	}, []);

	return (
		<TimerContext.Provider
			value={{
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
				resetTimers
			}}
		>
			{props.children}
		</TimerContext.Provider>
	);
};
