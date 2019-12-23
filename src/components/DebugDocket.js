import React, { Component, useContext } from 'react';
import NavBarContainer from './navbar/NavBarContainer';
import ApplicationViews from './ApplicationViews';
import { TimerProvider } from './providers/TimerProvider';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { ThemeContext } from './providers/ThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';

export default function DebugDocket(props) {
	const { useDarkMode, themeObject } = useContext(ThemeContext);

	const [ theme, toggleDarkMode ] = useDarkMode(themeObject);
	const themeConfig = createMuiTheme(theme)
	
	return (
		<MuiThemeProvider theme={themeConfig}>
			<CssBaseline />
			<TimerProvider>
				<NavBarContainer toggleDarkMode={toggleDarkMode}/>
				<ApplicationViews />
			</TimerProvider>
		</MuiThemeProvider>
	);
}
