import React from 'react';
import { IconButton, Tooltip, Menu, MenuItem } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

export default function EntryDetailsMoreButton({ history }) {
	const [ anchorEl, setAnchorEl ] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<React.Fragment>
			<Tooltip title="More" aria-label="more">
				<IconButton aria-label="details" size="small" style={{ marginTop: '5px' }} onClick={handleClick}>
					<MoreVertIcon />
				</IconButton>
			</Tooltip>
			<Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
				<MenuItem onClick={handleClose}>
					Profile
				</MenuItem>
				<MenuItem onClick={history.goBack}>Go Back</MenuItem>
				{/* <MenuItem onClick={handleLogout}>Logout</MenuItem> */}
			</Menu>
		</React.Fragment>
	);
}
