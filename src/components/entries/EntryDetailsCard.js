import React, { useContext /* , { useEffect } */, useState, useRef, useEffect } from 'react';
import {
	Paper,
	Typography,
	Card,
	Button,
	TextField,
	useTheme,
	Avatar,
	CardHeader,
	Tooltip,
	IconButton
} from '@material-ui/core';
import { UserContext } from '../providers/UserProvider';
import CommentRepository from '../../repositories/CommentRepository';
import CommentCard from '../comments/CommentCard';
import moment from 'moment';
import EntryDetailsMoreButton from './EntryDetailsMoreButton';
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

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

	const theme = useTheme();
	const { palette: { type, primary, secondary, error } } = theme;

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

	const updateComment = (commentObj) => {
		CommentRepository.updateComment(commentObj).then(() => {
			CommentRepository.getSingleEntryCommentList(entry.id).then(setCommentArray);
		});
	};

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
		color: type === 'light' ? 'primary' : 'secondary'
	};

	let entryStyle = {
		backgroundColor: type === "light" ? error.main : error.dark,
		margin: '10px 10px',
		padding: '3px',
		borderRadius: "5px"
	};
	// display color change if bug has been solved/closed
	if (entry.isCompleted) {
		entryStyle = {
			...entryStyle,
			backgroundColor: type === "light" ? secondary.light : secondary.dark,
		};
	}

	return (
		<React.Fragment>
			<div style={{ flex: 1, textAlign: 'center', minWidth: '375px', margin: '10px' }}>
				<Typography variant="h5">BUG DETAILS</Typography>
				<Card style={{ padding: '10px', height: '82.3vh' }}>
					<CardHeader style={entryStyle}
						// style={entryStyle}
						avatar={
							<Avatar
								aria-label="profile-picture"
								src={entry.user.avatarUrl}
								edge="end"
								style={{ margin: '5px' }}
								// className={classes.large}
							>
								{entry.user.firstName.slice(0, 1)}
								{entry.user.lastName.slice(0, 1)}
							</Avatar>
						}
						title={
							<Typography>
								{
									<span>
										{entry.user.firstName} {entry.user.lastName}{' '}
									</span>
								}
								{activeUserId === entry.userId && <span>(you) </span>}
								<span>{moment(entry.timeStarted).fromNow()}</span>
							</Typography>
						}
						action={
							<div style={{ marginTop: "10px"}}>
								{isLoggedInUserEntry && (
									<Tooltip title="Edit" aria-label="edit">
										<IconButton onClick={() => history.push(`/home/${id}/edit`)}>
											<EditIcon />
										</IconButton>
									</Tooltip>
								)}
								<Tooltip title="Go back" aria-label="go-back">
									<IconButton onClick={history.goBack}>
										<ArrowBackIcon />
									</IconButton>
								</Tooltip>
							</div>
						}
					/>
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
					{/* <div>
						{isLoggedInUserEntry && (
							<React.Fragment>
								<Button
									variant="outlined"
									color="default"
									onClick={() => history.push(`/home/${id}/edit`)}
								>
									Edit
								</Button>
							</React.Fragment>
						)}
						<Button variant="outlined" color={style.color} onClick={() => history.goBack()}>
							Go back
						</Button>
					</div> */}
				</Card>
			</div>
			<div style={{ margin: '10px', flex: 1, minWidth: '375px' }}>
				<Typography variant="h5" style={{ textAlign: 'center' }}>
					COMMENTS
				</Typography>
				<Card style={{ height: '55vh' }}>
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
				<br />
				<Card>
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
					<div style={{ textAlign: 'right', marginRight: '30px', marginTop: '-10px', marginBottom: '10px' }}>
						<Button color={style.color} variant="contained" onClick={postNewComment}>
							Comment
						</Button>
					</div>
				</Card>
			</div>
		</React.Fragment>
	);
}
