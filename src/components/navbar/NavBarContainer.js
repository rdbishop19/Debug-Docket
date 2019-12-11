import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import BugReportIcon from '@material-ui/icons/BugReport';
import { Link as RouterLink } from 'react-router-dom';
import useBasicAuth from '../../hooks/ui/useBasicAuth';

const login = React.forwardRef((props, ref) => <RouterLink innerRef={ref} to="/login" {...props} />);
const home = React.forwardRef((props, ref) => <RouterLink innerRef={ref} to="/home" {...props} />);

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1,
		textAlign: 'center'
	}
}));

function NavBarNonUser(props) {
  const classes = useStyles();
  const { isAuthenticated, logout } = useBasicAuth()

  const handleLogout = e => {
    e.preventDefault()

    logout()
    props.history.push("/login")
  }
	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						component={home}
						aria-label="menu"
					>
						<BugReportIcon />
					</IconButton>
					{/* <IconButton edge="end" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
					<Typography variant="h6" className={classes.title}>
						Debug Docket
					</Typography>
					{ isAuthenticated() ? 
            <Button color="secondary" onClick={handleLogout} variant="outlined">
						  Logout
					  </Button> :
            <Button color="secondary" component={login} variant="contained">
              Login
            </Button>}
				</Toolbar>
			</AppBar>
		</div>
	);
}
const NavBarContainer = (props) => {
	return <NavBarNonUser {...props} />;
};

export default withRouter(NavBarContainer);
