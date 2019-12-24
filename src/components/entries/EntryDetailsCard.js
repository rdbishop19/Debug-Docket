import React, { useContext /* , { useEffect } */, useState, useRef, useEffect } from 'react';
import { Paper, Typography, Card, Button, TextField } from '@material-ui/core';
import { UserContext } from '../providers/UserProvider';
import CommentRepository from '../../repositories/CommentRepository';

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
		CommentRepository.postNewComment(newComment)
		.then((newComment)=>{
			setCommentArray({
				...commentArray,
				newComment
			})
		})
		//todo: post to DB

		//todo: get new comment list then update state
	};

	const getComments = () => {
		CommentRepository.getSingleEntryCommentList(entry.id)
		.then(setCommentArray)
	}

	useEffect(getComments, [commentArray])

	return (
		<React.Fragment>
			<Paper style={{ margin: '10px 10px', textAlign: 'center' }}>
				<Card>
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
			</Paper>
			<TextField
				id="comment"
				type="text"
				style={{ width: '97%', margin: '15px 15px' }}
				placeholder="Know a possible way to solve this bug?"
				// label="Comment"
				// ref={comment}
				value={comment}
				// onKeyPress={handleKeyPress}
				multiline
				rows="3"
				onChange={(event, value) => handleChange(event, value)}
				variant="outlined"
			/>
			<div style={{ textAlign: 'right', marginRight: '25px' }}>
				<Button color="primary" variant="contained" onClick={postNewComment}>
					Comment
				</Button>
			</div>
			<Typography variant="h5">Comments</Typography>
			<Paper>
				{commentArray.length ? commentArray.map((comment) => {
					return <Card>{comment.text}</Card>;
				}): <h4>No comments</h4>}
			</Paper>
		</React.Fragment>
	);
}
