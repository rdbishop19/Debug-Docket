import React from 'react';
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import HomeButton from './HomeButton'
import ProfileButton from './ProfileButton'

import { Link as RouterLink } from 'react-router-dom';
import useBasicAuth from '../../hooks/ui/useBasicAuth';

const login = React.forwardRef((props, ref) => <RouterLink innerRef={ref} to="/login" {...props} />);

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
  const { isAuthenticated } = useBasicAuth()

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<HomeButton className={classes.menuButton}/>
					
					<Typography variant="h6" className={classes.title}>
						Debug Docket
					</Typography>
					{ isAuthenticated() ? 
						<ProfileButton className={classes.menuButton} {...props} />
						:
            			<Button color="secondary" component={login} variant="contained">
              			  Register / Login
            			</Button>
					}
				</Toolbar>
			</AppBar>
		</div>
	);
}
const NavBarContainer = (props) => {
	return <NavBarNonUser {...props} />;
};

export default withRouter(NavBarContainer);
