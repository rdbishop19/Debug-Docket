import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import HomeButton from './HomeButton';
import ProfileButton from './ProfileButton';
import BugReportIcon from '@material-ui/icons/BugReport';

import { Link as RouterLink } from 'react-router-dom';
import useBasicAuth from '../../hooks/ui/useBasicAuth';
import CurrentTime from '../timer/CurrentTime';
import NavTimer from '../timer/NavTimer';
import { FormControlLabel, Switch } from '@material-ui/core';

import './NavBar.css'

const login = React.forwardRef((props, ref) => <RouterLink innerRef={ref} to="/login" {...props} />);
const getLoggedInUser = () => {
	const localUser = JSON.parse(localStorage.getItem('credentials'));
	if (localUser !== null) {
		return localUser;
	}
	const sessionUser = JSON.parse(sessionStorage.getItem('credentials'));
	if (sessionUser !== null) {
		return sessionUser;
	}
	// console.log('localUser', localUser)
	// console.log('sessionUser', sessionUser)
};

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1,
		textAlign: 'center',
		cursor: 'pointer'
	},
	timer: {
		margin: "0 20px"
	}
}));

function NavBarNonUser(props) {
	const { palette: { type, primary, secondary, error } } = useTheme();
	const user = getLoggedInUser();
	// console.log('user', user);
	const classes = useStyles();
	const { isAuthenticated } = useBasicAuth();

	const goToHome = () => {
		if (isAuthenticated()) {
			props.history.push('/home');
		} else props.history.push('/');
	};

	return (
		<div className={classes.root}>
			<AppBar position="static" color={ type === "dark" ? 'background' : 'primary' }>
				<Toolbar>
					{isAuthenticated() && <HomeButton className={classes.menuButton} />}
					{/* <Typography variant="subtitle1" className={classes.menuButton}>
						<CurrentTime />
					</Typography> */}
					<NavTimer/>

					<Typography variant="h6" className={classes.title} onClick={goToHome}>
						Debug
						<BugReportIcon className="seconds" />
						Docket
					</Typography>
					<FormControlLabel control={<Switch onClick={props.toggleDarkMode}/>} label="Dark mode" />
					{isAuthenticated() ? (
						<ProfileButton className={classes.menuButton} user={user} {...props} />
					) : (
						<Button color="secondary" component={login} variant="contained">
							Register / Login
						</Button>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
}
const NavBarContainer = (props) => {
	return <NavBarNonUser {...props} />;
};

export default withRouter(NavBarContainer);
