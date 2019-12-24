import React, { useContext /* , { useEffect } */, useState, useRef, useEffect } from 'react';
import { Paper, Typography, Card, Button, TextField, useTheme } from '@material-ui/core';
import { UserContext } from '../providers/UserProvider';
import CommentRepository from '../../repositories/CommentRepository';
import CommentCard from '../comments/CommentCard';

function convertDateTimeFromISO(date) {
	return new Date(date);
}

export default function EntryDetailsCard({ entry, history /* , deleteEntry */ }) {
	const {
		id,
		userId,
		title,
		description,
		severity,
		priority,
		category,
		isCompleted,
		timeStarted,
		timeCompleted,
		totalWorkTime,
		totalBreakTime
	} = entry;

    const theme = useTheme()
	const { palette: { type, primary, secondary }} = theme
	
	const { getLoggedInUser } = useContext(UserContext);
	const activeUserId = getLoggedInUser().id;
	const isLoggedInUserEntry = activeUserId === userId;
	// const displayDate = convertDateTimeFromISO(timeStarted)

	const [ comment, setComment ] = useState('');
	const [ commentArray, setCommentArray ] = useState([]);
	// const comment = useRef()
	// const handleDelete = () => {
	//     deleteEntry(id).then(()=>history.push("/home"))
	// }

	const handleChange = (event, value) => {
		setComment(event.target.value);
	};

	const postNewComment = () => {
		//create comment obj w/ current timestamp
		const newComment = {
			text: comment,
			entryId: entry.id,
			userId: activeUserId,
			timestamp: new Date().toISOString()
		};
		console.log(newComment);
		// post new comment to DB
		CommentRepository.postNewComment(newComment).then((newComment) => {
			// update state by appending newComment to current commentArray
			// setCommentArray({
			// 	...commentArray,
			// 	newComment
			// })
			CommentRepository.getSingleEntryCommentList(entry.id).then(setCommentArray);
			setComment('');
		});
	};
	
	const updateComment = commentObj => {
		CommentRepository.updateComment(commentObj)
		.then(() => {
			CommentRepository.getSingleEntryCommentList(entry.id).then(setCommentArray)
		})
	}

	const deleteComment = (id) => {
		CommentRepository.delete(id).then(() => {
			CommentRepository.getSingleEntryCommentList(entry.id).then(setCommentArray);
		});
	};

	const getComments = () => {
		CommentRepository.getSingleEntryCommentList(entry.id).then(setCommentArray);
	};

	useEffect(getComments, []);

	const style = {
        color: type === "light" ? "primary" : "secondary"
	}
	
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'row',
				flexWrap: 'wrap',
				justifyContent: 'center',
				height: '85vh',
			}}
		>
			<Card style={{ margin: '10px 10px', flex: 1, textAlign: "center", minWidth: "375px" }}>
				<Typography variant="h5" component="h3">
					BUG DETAILS
				</Typography>

				<Typography>
					<span>Title: </span>
					{title}
				</Typography>
				<Typography>
					<span>Description: </span>
					{description}
				</Typography>
				<Typography>
					<span>Status: </span>
					{isCompleted ? 'Closed' : 'Open'}
				</Typography>
				<Typography>
					<span>Submitted on: </span>
					{new Date(timeStarted).toLocaleString()}
				</Typography>
				<Typography>
					<span>Severity: </span>
					{severity.label}
				</Typography>
				<Typography>
					<span>Priority: </span>
					{priority.label}
				</Typography>
				<Typography>
					<span>Category: </span>
					{category.label}
				</Typography>
				{isLoggedInUserEntry && (
					<React.Fragment>
						<Button variant="outlined" color="default" onClick={() => history.push(`/home/${id}/edit`)}>
							Edit
						</Button>
						{/* <Button variant="contained" color="secondary" onClick={deleteEntry}>Delete</Button> */}
					</React.Fragment>
				)}
				<Button variant="outlined" color="primary" onClick={() => history.goBack()}>
					Go back
				</Button>
			</Card>
			<div style={{ margin: '10px', flex: 1, minWidth: "375px" }}>
				<TextField
					id="comment"
					type="text"
					style={{ width: '97%', margin: '15px 15px' }}
					placeholder={
						isLoggedInUserEntry ? 'Comment on your bug' : 'Add a comment to help your fellow dev'
					}
					InputProps={style}
					value={comment}
					// onKeyPress={handleKeyPress}
					multiline
					rows="3"
					onChange={(event, value) => handleChange(event, value)}
					variant="outlined"
				/>
				<div style={{ textAlign: 'right', marginRight: '25px' }}>
					<Button color={style.color} variant="contained" onClick={postNewComment}>
						Comment
					</Button>
				</div>
				<Typography variant="h5">Comments</Typography>
				<Card style={{ height: "55vh"}}>
					<br />
					{commentArray.length > 0 ? (
						commentArray.map((comment) => {
							return (
								<CommentCard
									key={comment.id}
									comment={comment}
									activeUserId={activeUserId}
									isUserEntry={activeUserId === entry.userId}
									deleteComment={deleteComment}
									updateComment={updateComment}
								/>
							);
						})
					) : (
						<h4>No comments</h4>
					)}
					<br />
				</Card>
			</div>
		</div>
	);
}
