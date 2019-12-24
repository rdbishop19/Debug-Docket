import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

export default function CommentMenu({ comment, isUserEntry, deleteComment, activeUserId, handleClickOpen }) {
	const [ anchorEl, setAnchorEl ] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
    };
    
    const handleEdit = () => {
        handleClickOpen()
        handleClose()
    }

    const handleDelete = () => {
        deleteComment(comment.id)
        handleClose()
    }

	return (
		<React.Fragment>
			<IconButton edge="start" color="inherit" aria-label="menu" onClick={handleClick} size="small">
				<MoreVertIcon />
			</IconButton>
			<Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
				{comment.userId === activeUserId && <MenuItem onClick={handleEdit}>Edit</MenuItem>}
				{(isUserEntry || comment.userId === activeUserId) && (
					<MenuItem onClick={handleDelete}>Remove</MenuItem>
				)}
			</Menu>
		</React.Fragment>
	);
}
