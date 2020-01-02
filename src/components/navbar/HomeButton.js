import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { IconButton } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
// import BugReportIcon from '@material-ui/icons/BugReport';
import MenuIcon from '@material-ui/icons/Menu';

const home = React.forwardRef((props, ref) => <RouterLink innerRef={ref} to="/home" {...props} />);
const feed = React.forwardRef((props, ref) => <RouterLink innerRef={ref} to="/feed" {...props} />);
const history = React.forwardRef((props, ref) => <RouterLink innerRef={ref} to="/history" {...props} />);

export default function HomeButton(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
						edge="start"
						color="inherit"
            aria-label="menu"
            onClick={handleClick}
					>
						<MenuIcon />
			</IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} component={home}>Home</MenuItem>
        <MenuItem onClick={handleClose} component={feed}>Social Feed</MenuItem>
        <MenuItem onClick={handleClose} component={history}>Bug History</MenuItem>

      </Menu>
    </div>
  );
}