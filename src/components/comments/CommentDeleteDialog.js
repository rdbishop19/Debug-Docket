import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTheme } from '@material-ui/core';

export default function CommentDeleteDialog({ open, handleDeleteDialogClose, comment, deleteComment }) {
    const theme = useTheme()
    const { palette: { type, primary, secondary }} = theme

    const style = {
        color: type === "light" ? "primary" : "secondary"
    }
    const handleDelete = () => {
        deleteComment(comment.id)
        handleDeleteDialogClose()
    }

	const handleClose = () => {
		handleDeleteDialogClose();
	};

	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{'Please confirm'}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">Delete this comment?</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="default">
						Cancel
					</Button>
					<Button onClick={handleDelete} color={style.color} autoFocus>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
