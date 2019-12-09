import React, { Component } from 'react';
import NavBar from './navbar/NavBar';
import ApplicationViews from './ApplicationViews';

export class DebugDocket extends Component {
	render() {
		return (
			<React.Fragment>
                <NavBar />
				<ApplicationViews />
			</React.Fragment>
		);
	}
}

export default DebugDocket;
