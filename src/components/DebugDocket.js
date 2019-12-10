import React, { Component } from 'react';
import NavBarContainer from './navbar/NavBarContainer';
import ApplicationViews from './ApplicationViews';

export class DebugDocket extends Component {
	render() {
		return (
			<React.Fragment>
                <NavBarContainer />
				<ApplicationViews />
			</React.Fragment>
		);
	}
}

export default DebugDocket;
