import React from 'react';
import TimerContainer from '../timer/TimerContainer';
import EntriesContainer from '../entries/EntriesContainer';

export default function HomeContainer(props) {
	return (
		<React.Fragment>
			<TimerContainer {...props} />
			<EntriesContainer {...props} />
		</React.Fragment>
	);
}
