import React, { useRef, useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { UserContext } from '../providers/UserProvider';
import useBasicAuth from '../../hooks/ui/useBasicAuth';

// import Settings from '../../repositories/Settings'
import {
	FormControl,
	InputLabel,
	Input,
	Button,
	Paper,
	Typography,
	Link,
	FormControlLabel,
	Checkbox,
	Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Link as RouterLink } from 'react-router-dom';
import { EntryContext } from '../providers/EntryProvider';
import GuestMode from './GuestMode';
import Motto from './Motto';

const loginComponent = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(3, 2),
		textAlign: 'center'
	},
	formfield: {
		display: 'block'
	}
}));

const Register = (props) => {
	const firstName = useRef();
	const lastName = useRef();
	const email = useRef();
	const password = useRef();
	const verifyPassword = useRef();

	const [ checked, setChecked ] = useState(false);
	// use style classes defined above
	const classes = useStyles();

	// save new user after validating account creation
	const { login } = useBasicAuth();

	// useContext from UserProvider
	const { createAccount, findUser, setLoggedInUser } = useContext(UserContext);
	const { /* setEntries, */ setUserEntries } = useContext(EntryContext);

	const handleRegister = (e) => {
		e.preventDefault();
		if (password.current.value !== verifyPassword.current.value) {
			window.alert("Password fields don't match. Please re-enter them.");
			password.current.focus();
			return;
		}
		// check if user already exists
		findUser(email.current.value, password.current.value).then((data) => {
			const foundUser = data.length;
			if (foundUser) {
				// console.log('user already exits', data)
				window.alert('User email already exists. Please use a different email.');
				email.current.focus();
				return;
			}
			const newUser = {
				firstName: firstName.current.value,
				lastName: lastName.current.value,
				email: email.current.value,
				password: password.current.value
			};

			// post to db and save to local/session storage
			createAccount(newUser).then((user) => {
				// console.log('newUser response', user)
				const storage = checked !== true ? localStorage : sessionStorage;
				login(user, user.email, user.password, storage);
				setLoggedInUser(user.id);
				setUserEntries([]);
				props.history.push({
					pathname: '/home'
				});
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
							Register
						</Typography>
						<Typography component="p">Create New Account</Typography>
						<Typography component="div" />
						<br />
						<form onSubmit={handleRegister} style={{ width: '200px', margin: '0 auto' }}>
							<FormControl>
								<InputLabel htmlFor="firstName"> First Name </InputLabel>
								<Input
									inputRef={firstName}
									type="text"
									name="firstName"
									placeholder="First name"
									autoComplete="given-name"
									required
									autoFocus
								/>
							</FormControl>
							<FormControl>
								<InputLabel htmlFor="lastName"> Last Name </InputLabel>
								<Input
									inputRef={lastName}
									type="text"
									name="lastName"
									placeholder="Last name"
									autoComplete="family-name"
									required
								/>
							</FormControl>
							<FormControl>
								<InputLabel htmlFor="inputEmail"> Email address </InputLabel>
								<Input
									inputRef={email}
									type="email"
									name="email"
									placeholder="Email address"
									autoComplete="email"
									required
								/>
							</FormControl>
							<FormControl>
								<InputLabel htmlFor="inputPassword"> Password </InputLabel>
								<Input
									inputRef={password}
									type="password"
									name="password"
									placeholder="Password"
									autoComplete="new-password"
									required
								/>
							</FormControl>
							<FormControl>
								<InputLabel htmlFor="verifyPassword"> Verify Password </InputLabel>
								<Input
									inputRef={verifyPassword}
									type="password"
									name="verifyPassword"
									placeholder="Verify password"
									autoComplete="new-password"
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
									Register
								</Button>
							</FormControl>
						</form>
						<Link component={loginComponent} to="/login">
							Already have an account?
						</Link>
					</Grid>
				</Grid>
			</Paper>

			<GuestMode {...props} />
		</React.Fragment>
	);
};

export default withRouter(Register);
