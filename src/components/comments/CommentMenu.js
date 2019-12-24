import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

// const home = React.forwardRef((props, ref) => <RouterLink innerRef={ref} to="/home" {...props} />);
// const feed = React.forwardRef((props, ref) => <RouterLink innerRef={ref} to="/feed" {...props} />);
// const history = React.forwardRef((props, ref) => <RouterLink innerRef={ref} to="/history" {...props} />);

export default function CommentMenu({ comment, isUserEntry, deleteComment, activeUserId }) {
	const [ anchorEl, setAnchorEl ] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<React.Fragment>
			<IconButton edge="start" color="inherit" aria-label="menu" onClick={handleClick} size="small">
				<MoreVertIcon />
			</IconButton>
			<Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
				{comment.userId === activeUserId && (
					// <Tooltip title="Edit comment" aria-label="edit-comment" style={{ marginLeft: "20px"}}>
					<MenuItem>Edit</MenuItem>
				)
				// </Tooltip>
				}
				{(isUserEntry || comment.userId === activeUserId) && (
					// <Tooltip title="Delete comment" aria-label="delete-comment">
					// <IconButton onClick={() => deleteComment(comment.id)} size="small" style={{ marginLeft: "20px"}}>
					//     <DeleteIcon />
					// </IconButton>
					<MenuItem onClick={() => deleteComment(comment.idP)}>Remove</MenuItem>
				)
				// </Tooltip>
				}
			</Menu>
		</React.Fragment>
	);
}
