import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTheme } from '@material-ui/core';

export default function CommentEditDialog({comment, open, handleDialogClose, updateComment}) {
    const theme = useTheme()
    const { palette: { type, primary, secondary }} = theme

    const [editedComment, setEditedComment] = useState(comment.text)

    const saveEditedComment = () =>{
        const newComment = {
            id: comment.id,
            text: editedComment,
        }
        updateComment(newComment)
        handleDialogClose()
    }

    const style = {
        color: type === "light" ? "primary" : "secondary"
    }

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
            InputProps={style}
            InputLabelProps={style}
            value={editedComment}
            onChange={(e)=> setEditedComment(e.target.value)}
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} style={style}>
            Cancel
          </Button>
          <Button onClick={saveEditedComment} color={style.color} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}