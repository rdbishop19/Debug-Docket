import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function CommentEditDialog({comment, open, handleDialogClose, updateComment}) {
//   const [open, setOpen] = React.useState(false);
    const [editedComment, setEditedComment] = useState(comment.text)

    const saveEditedComment = () =>{
        const newComment = {
            id: comment.id,
            text: editedComment,
        }
        updateComment(newComment)
        handleDialogClose()
    }
//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

  return (
    <div>
      <Dialog open={open} onClose={handleDialogClose}aria-labelledby="form-dialog-title" width="fit-content">
        <DialogTitle id="form-dialog-title">Edit Comment</DialogTitle>
        <DialogContent>
            Original: 
          <DialogContentText>
            {comment.text}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="comment"
            label="Edited"
            value={editedComment}
            onChange={(e)=> setEditedComment(e.target.value)}
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={saveEditedComment} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}