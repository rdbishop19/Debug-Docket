import React, { Component } from 'react';
import NavBarContainer from './navbar/NavBarContainer';
import ApplicationViews from './ApplicationViews';
import { TimerProvider } from './providers/TimerProvider';

export class DebugDocket extends Component {
	render() {
		return (
			<TimerProvider>
                <NavBarContainer />
				<ApplicationViews />
			</TimerProvider>
		);
	}
}

export default DebugDocket;
