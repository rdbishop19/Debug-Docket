import React, { useRef, useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { UserContext } from '../providers/UserProvider';
import useBasicAuth from '../../hooks/ui/useBasicAuth';

import {
	FormControl,
	InputLabel,
	Input,
	Button,
	Checkbox,
	FormControlLabel,
	Paper,
	Typography,
	Link,
	Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Link as RouterLink } from 'react-router-dom';
import { EntryContext } from '../providers/EntryProvider';
import GuestMode from './GuestMode';
import Motto from './Motto';
/* 
    Purpose: Render the login screen and set user in storage
    Author: Ryan Bishop
*/

const register = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(3, 2),
		textAlign: 'center'
	},
	formfield: {
		display: 'block'
	}
}));

const Login = (props) => {
	// setup variables for use in React fn component
	const email = useRef();
	const password = useRef();
	// const remember = useRef(false) // abandoned this in favor of useState
	const classes = useStyles();

	const [ checked, setChecked ] = useState(false);
	// pull 'login' fn from 'useBasicAuth' component
	const { login } = useBasicAuth();
	// console.log('remember?', remember.current.value) // couldn't get this to get right value from MaterialUI component
	// console.log('checked', checked)

	const { findUser, setLoggedInUser } = useContext(UserContext);
	const { setEntries, setUserEntries } = useContext(EntryContext);

	const handleLogin = (e) => {
		e.preventDefault();

		// console.log('remember?', remember.current.value)
		// const storage = remember.current.value !== "on" ? localStorage : sessionStorage
		findUser(email.current.value, password.current.value).then((user) => {
			// console.log('doing great!')
			const foundUser = user.length;

			if (!foundUser) {
				window.alert('There is no account associated with this email. Please try again');
				email.current.focus();
				return;
			}
			const storage = checked !== true ? localStorage : sessionStorage;
			login(user[0], email.current.value, password.current.value, storage);
			setLoggedInUser(user[0].id);
			setUserEntries([]);
			props.history.push({
				pathname: '/home'
			});
		});
	};
	return (
		<React.Fragment>
			<Paper className={classes.root}>
				<Grid container spacing={1}>
					<Grid item xs={8} sm={8}>
						<Motto />
					</Grid>
					<Grid item xs={4} sm={4}>
						<Typography variant="h4" component="h3">
							Welcome Back!
						</Typography>
						<Typography component="p">Please enter your account information.</Typography>
						<Typography component="div">
							<br />
							<form
								onSubmit={handleLogin}
								autoComplete="off"
								style={{ width: '200px', margin: '0 auto' }}
							>
								<FormControl>
									<InputLabel htmlFor="email">Email</InputLabel>
									<Input
										inputRef={email}
										id="email"
										type="email"
										autoComplete="email"
										required
										autoFocus
									/>
								</FormControl>
								<FormControl>
									<InputLabel htmlFor="password">Password</InputLabel>
									<Input
										inputRef={password}
										id="password"
										type="password"
										autoComplete="current-password"
										required
									/>
								</FormControl>
								<FormControl margin="normal">
									<FormControlLabel
										control={
											<Checkbox
												// had to abandon 'ref' and use state instead
												// inputRef={remember}
												id="remember"
												value="remember"
												checked={checked}
												color="primary"
												onChange={() => setChecked(!checked)}
												inputProps={{
													'aria-label': 'primary checkbox'
												}}
											/>
										}
										label="Remember me?"
									/>
								</FormControl>
								<FormControl margin="normal">
									<Button type="submit" variant="contained" color="primary">
										Sign in
									</Button>
								</FormControl>
							</form>
							<Link component={register} to="/register">
								New user? Create account
							</Link>
						</Typography>
					</Grid>
				</Grid>
			</Paper>
			{/* <br />
			<br /> */}
			<GuestMode {...props} />
		</React.Fragment>
	);
};

export default withRouter(Login);
