import React, { useState, useEffect } from 'react';

export default function CurrentTime() {
	const [ time, setTime ] = useState(new Date());
	// console.log('time', time);
	useEffect(
		() => {
			const interval = setInterval(() => {
				setTime(new Date());
			}, 1000);
			return () => clearInterval(interval);
		},
		[ time ]
	);
	return time.toLocaleTimeString()
}
