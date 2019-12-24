import React, { useState } from 'react';
import { useTheme, Typography, Paper, Tooltip, Button, IconButton, Avatar, makeStyles } from '@material-ui/core';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import CommentMenu from './CommentMenu';
import CommentEditDialog from './CommentEditDialog'
import CommentDeleteDialog from './CommentDeleteDialog';

// const formatTime = (timestamp) => {
//     // console.log(moment(timestamp).dayOfYear())

//     const commentDate = moment(timestamp).dayOfYear()
//     const today = moment().dayOfYear()

//     if (commentDate !== today){
//         return moment(timestamp).startOf('hour').fromNow()
//     } else if (commentDate === today){
//         return moment(timestamp).subtract(1, 'days').calendar();
//     }
//     else return timestamp
// }
const useStyles = makeStyles(theme => ({
    tooltip: {
      maxWidth: 'none',
      backgroundColor: 'black',
    }
  }));

export default function CommentCard(props) {
    const classes = useStyles()
	const { comment, isUserEntry, deleteComment, activeUserId, updateComment } = props;
	const { text, user, timestamp } = comment;
	const theme = useTheme();
	const { palette: { type, primary, secondary, error } } = theme;

	//edit comment dialog setup
	const [ open, setOpen ] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleDialogClose = () => {
		setOpen(false);
	};
    //

    const [deleteOpen, setDeleteOpen] = useState(false)
    
    const handleOpenDeleteDialog = () => {
        setDeleteOpen(true)
    }
    const handleDeleteDialogClose = () => {
        setDeleteOpen(false)
    }

	const styles = {
		cardStyle: {
			margin: '20px 25px'
		},
		nameStyle: {
			color: type === 'light' ? primary.main : secondary.main
			// color: secondary.dark
		},
		timerStyle: {
			cursor: 'pointer'
		},
		menuButtonStyle: {
			backgroundColor: 'black'
		}
	};
	return (
		<div style={styles.cardStyle}>
			<div style={{ display: 'flex' }}>
				<Avatar
					aria-label="profile-picture"
					src={comment.user.avatarUrl}
					edge="end"
					style={{ margin: '5px', marginTop: '-5px', height: '30px', width: '30px' }}
				>
					{comment.user.firstName.slice(0, 1)}
					{comment.user.lastName.slice(0, 1)}
				</Avatar>
				<Typography>
					<span />
					<span style={styles.nameStyle}>
						{activeUserId === comment.userId ? '(you) ' : `${user.firstName} ${user.lastName} `}
					</span>
					<span>{` • `}</span>
					<Tooltip title={new Date(timestamp).toString()} placement="top" arrow classes={{ tooltip: classes.tooltip }}>
						<span style={styles.timerStyle}>{moment(timestamp).fromNow()}</span>
					</Tooltip>
					<CommentMenu style={styles.menuButtonStyle} {...props} handleClickOpen={handleClickOpen} handleOpenDeleteDialog={handleOpenDeleteDialog}/>
				</Typography>
			</div>
			<Typography>{text}</Typography>
            <CommentEditDialog open={open} handleDialogClose={handleDialogClose} comment={comment} updateComment={updateComment}/>
            <CommentDeleteDialog open={deleteOpen} handleDeleteDialogClose={handleDeleteDialogClose} comment={comment} deleteComment={deleteComment}/>
		</div>
	);
}
