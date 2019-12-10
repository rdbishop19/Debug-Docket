import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import BugReportIcon from '@material-ui/icons/BugReport';
import { Link as RouterLink } from 'react-router-dom'

const login = React.forwardRef((props, ref) => (
  <RouterLink innerRef={ref} to="/login" {...props} />
));
const home = React.forwardRef((props, ref) => (
  <RouterLink innerRef={ref} to="/home" {...props} />
))

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
  },
}));

function NavBarNonUser(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" component={home} aria-label="menu">
            <BugReportIcon />
          </IconButton>
          {/* <IconButton edge="end" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            Debug Docket
          </Typography>
          <Button color="default" component={login}>
            Sign Up / Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export class NavBarContainer extends Component {
    render() {
        return (
            <NavBarNonUser {...this.props} />
        )
    }
}

export default NavBarContainer
