import React from 'react';
import { useTheme, Typography, Paper, Tooltip, Button, IconButton, Avatar } from '@material-ui/core';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import CommentMenu from './CommentMenu';
import CommentEditDialog from './CommentEditDialog'

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

export default function CommentCard(props) {
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
	const styles = {
		cardStyle: {
			margin: '20px 25px'
		},
		nameStyle: {
			// color: type === 'light' ? primary.main : secondary.main
			color: secondary.dark
		},
		timerStyle: {
			cursor: 'pointer'
		},
		menuButtonStyle: {
			backgroundColor: 'black'
		}
		// small: {
		//     width: theme.spacing(2),
		//     height: theme.spacing(2),
		//   },
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
					<Tooltip title={new Date(timestamp).toString()} placement="top" arrow>
						<span style={styles.timerStyle}>{moment(timestamp).fromNow()}</span>
					</Tooltip>
					<CommentMenu style={styles.menuButtonStyle} {...props} handleClickOpen={handleClickOpen}/>
				</Typography>
			</div>
			<Typography>{text}</Typography>
            <CommentEditDialog open={open} handleDialogClose={handleDialogClose} comment={comment} updateComment={updateComment}/>
		</div>
	);
}
