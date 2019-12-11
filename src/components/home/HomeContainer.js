import React from 'react';
import TimerContainer from '../timer/TimerContainer';
import EntriesContainer from '../entries/EntriesContainer';

export default function HomeContainer(props) {
	return (
		<div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", height: "85vh", textAlign: "center"}}>
			<TimerContainer {...props} />
			<EntriesContainer {...props} />
		</div>
	);
}
