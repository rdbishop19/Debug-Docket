import React, { useState, useRef, useEffect } from 'react';
import EntryRepository from '../../repositories/EntryRepository';

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

	const defaultSession = 1500000;
	const defaultBreak = 300000;
	const [ timer, setTimer ] = useState(storedTimer ? resumeTimer : defaultSession); // change to 1500000 when done testing (25 minutes)
	const [ sessionTime, setSessionTime ] = useState(defaultSession);
	const [ breakTime, setBreakTime ] = useState(defaultBreak);
	const [ mode, setMode ] = useState(storedMode ? storedMode : 'session');
	const storeTimer = useRef(resumeTimer !== null ? storedTimer : timer);
	const storeState = useRef(storedState !== null ? storedState : 'paused');
	const storeMode = useRef(storedMode !== null ? storedMode : 'session');

	const [ active, setActive ] = useState(storeState.current === 'paused' ? false : true);
	const [ elapsedTime, setElapsedTime ] = useState(0);

	const initialTime = useRef();
	const endTime = useRef();

	const storedTimerEntry = JSON.parse(localStorage.getItem('currentEntry'));
	const [ timerEntry, setTimerEntry ] = useState(storedTimerEntry !== null ? storedTimerEntry : null);

	const [ databaseTime, setDatabaseTime ] = useState(0);

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
			const img = '/favicon-32x32.png'
			if (mode === 'session') {
				if (Notification.permission === 'granted') {
					// const img = '../../public/favicon-32x32.png';
					const text = 'Take a break! You earned it.'
					// var notification = new Notification('To do list', { body: text, icon: img });
					const notification = new Notification('DEBUG DOCKET', { body: text, icon: img});
				}
				setMode('break');
				document.title = 'Break time!';
				setTimer(breakTime);
				setElapsedTime(0);
			} else {
				if (Notification.permission === 'granted') {
					// const img = '/public/favicon-32x32.png';
					const text = 'Break time over. Start a new bug tracking session with the timer.'
					// var notification = new Notification('To do list', { body: text, icon: img });
					const notification = new Notification('DEBUG DOCKET', { body: text, icon: img});
				}
				setMode('session');
				document.title = 'Debug Docket';
				setActive(!active);
				setTimer(sessionTime);
				setElapsedTime(0);
			}
			updateDatabaseEntry()
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
				setDatabaseTime((databaseTime) => databaseTime + delay);
				storeTimer.current = timer;
			}, 1000);

			return () => {
				clearInterval(interval);
			};
		}
	}
	function resetTimers() {
		updateDatabaseEntry()
		setActive(false);
		setMode('session');
		setTimer(sessionTime);
		setBreakTime(breakTime);
		setElapsedTime(0);
		document.title = 'Debug Docket';
	}

	function restartBreak() {
		setMode('break');
		// setBreakTime(breakTime)
		setElapsedTime(0);
		setTimer(breakTime);
	}

	const updateDatabaseEntry = () => {
		const storedTimerEntry = JSON.parse(localStorage.getItem('currentEntry'));
		if (storedTimerEntry !== null){
			const entryId = storedTimerEntry.id
			EntryRepository.get(entryId).then((entry) => {
				let updatedEntryTime = {}; // initialize object for scope access inside conditionals
				if (mode === 'session') {
					updatedEntryTime = {
						id: entryId,
						totalWorkTime: databaseTime + entry.totalWorkTime // have to add the timer time to the database time
					};
				} else if (mode === 'break') {
					updatedEntryTime = {
						id: entryId,
						totalBreakTime: databaseTime + entry.totalBreakTime
					};
				}
				EntryRepository.updateEntry(updatedEntryTime).then((entry) => {
					setTimerEntry(entry);
					setDatabaseTime(0);
				});
			});
		}
	};

	function toggle() {
		// about to change state from active to inactive, so set state as 'paused' for localStorage
		if (active) {
			storeState.current = 'paused';
			// console.log(sessionTime, elapsedTime);
			// console.log(breakTime, elapsedTime);
			updateDatabaseEntry();
			//TODO: save entry sessionTime to db
		} else {
			// console.log(sessionTime, elapsedTime);
			// console.log(breakTime, elapsedTime);
			storeState.current = 'started';
			//TODO: save entry breakTime to db
		}

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
		// console.log('useEffect');
		if (storedTimerEntry !== null) {
			EntryRepository.get(storedTimerEntry.id).then(setTimerEntry);
		}
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
				resetTimers,
				updateDatabaseEntry,
			}}
		>
			{props.children}
		</TimerContext.Provider>
	);
};
