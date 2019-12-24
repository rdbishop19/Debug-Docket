import React from 'react';
import { useTheme, Typography, Paper, Tooltip } from '@material-ui/core';
import moment from 'moment';

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

export default function CommentCard({ comment, isUserEntry }) {
	const { text, user, timestamp } = comment;
	const theme = useTheme();
	const { palette: { type, primary, secondary, error } } = theme;

	const styles = {
		cardStyle: {
			margin: '20px 25px'
		},
		nameStyle: {
			// color: type === 'light' ? primary.main : secondary.main
			color: secondary.dark
        },
        timerStyle: {
            cursor: "pointer",
        }
	};
	return (
		<div style={styles.cardStyle}>
			<Typography>
				<span style={styles.nameStyle}>
					{isUserEntry ? "(you) " : `${user.firstName} ${user.lastName} `}
				</span>
				<Tooltip title={new Date(timestamp).toString()} placement="top">
					<span style={styles.timerStyle}>{moment(timestamp).fromNow()}</span>
				</Tooltip>
			</Typography>
			<Typography>{text}</Typography>
		</div>
	);
}
