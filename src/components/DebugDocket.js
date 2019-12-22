import React, { Component, useContext } from 'react';
import NavBarContainer from './navbar/NavBarContainer';
import ApplicationViews from './ApplicationViews';
import { TimerProvider } from './providers/TimerProvider';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { ThemeContext } from './providers/ThemeProvider';


export default function DebugDocket(props) {
	const { useDarkMode, themeObject } = useContext(ThemeContext);

	const [ theme, toggleDarkMode ] = useDarkMode(themeObject);
	const themeConfig = createMuiTheme(theme)
	console.log('theme', theme)
	return (
		<MuiThemeProvider theme={themeConfig}>
			<TimerProvider>
				<NavBarContainer toggleDarkMode={toggleDarkMode}/>
				<ApplicationViews />
			</TimerProvider>
		</MuiThemeProvider>
	);
}
