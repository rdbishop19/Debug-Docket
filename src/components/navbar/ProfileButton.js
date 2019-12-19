import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { IconButton, Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
// import MenuIcon from '@material-ui/icons/Menu';
import useBasicAuth from '../../hooks/ui/useBasicAuth';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

//TODO: uncomment once these components are built
const profile = React.forwardRef((props, ref) => <RouterLink innerRef={ref} to="/profile/edit" {...props} />);
// const settings = React.forwardRef((props, ref) => <RouterLink innerRef={ref} to="/settings" {...props} />);

export default function HomeButton(props) {
	const [ anchorEl, setAnchorEl ] = React.useState(null);
    const { logout } = useBasicAuth()
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = (e) => {
		e.preventDefault();

		logout();
		props.history.push('/login');
	};

	return (
		// <div>
			<Button color="primary" variant="container" onClick={handleClick} style={{ color: "white"}}>
				{props.user && props.user.firstName}
				{/* <IconButton edge="end" color="inherit" aria-label="menu" > */}
					<AccountCircleIcon edge="end" style={{ padding: "5px" }}/>
				{/* </IconButton> */}
				<Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
					<MenuItem onClick={handleClose} component={profile}>
						Profile
					</MenuItem>
					<MenuItem onClick={handleClose} /* component={settings} */>
						Settings (todo)
					</MenuItem>
					<MenuItem onClick={handleLogout}>
						Logout
					</MenuItem>
				</Menu>
			</Button>
		// </div>
	);
}
