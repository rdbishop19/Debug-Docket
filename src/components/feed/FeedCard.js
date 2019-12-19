import React from 'react';
import {
	Button,
	Card,
	CardContent,
	Typography,
	makeStyles,
	Avatar,
	CardHeader,
	IconButton,
	Tooltip
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MoreVertIcon from '@material-ui/icons/MoreVert';
/* 
    Purpose: display the contents of each bug entry with styling and functionality
    Author: Ryan Bishop
*/
const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		'& > *': {
			margin: theme.spacing(1)
		}
	},
	small: {
		width: theme.spacing(3),
		height: theme.spacing(3)
	},
	large: {
		width: theme.spacing(6),
		height: theme.spacing(6)
	}
}));
function convertDateTimeFromISO(date) {
	return new Date(date);
}

export default function FeedCard(props) {
	const classes = useStyles();
	const { entry, activeUser, container, history } = props;
	const { user } = entry;
	console.log('entry', entry);
	console.log('user', user);
	const feedView = container === 'feed';
	const historyView = container === 'history';
	//TODO: update this later during styline time
	let entryStyle = {
		backgroundColor: '#a7ffeb',
		margin: '10px 10px',
		padding: '3px',
		borderRadius: "5px"
	};
	if (entry.userId === activeUser.id) {
		entryStyle = {
			...entryStyle,
			backgroundColor: 'salmon'
		};
	}

	return (
		<Card key={entry.id} style={{ margin: '5px 5px'}}>
			{/* <CardHeader
					avatar={
						<Avatar aria-label="recipe" className={classes.avatar}>
							R
						</Avatar>
					}
					action={
						<IconButton aria-label="settings">
						<MoreVertIcon />
						</IconButton>
					}
					title="Shrimp and Chorizo Paella"
					subheader="September 14, 2016"
				/> */}
			<CardHeader style={entryStyle}
				avatar={
					<Avatar
						aria-label="profile-picture"
						src={entry.user.avatarUrl}
						edge="end"
						style={{ margin: '5px' }}
						className={classes.large}
					>
						{entry.user.firstName.slice(0, 1)}
						{entry.user.lastName.slice(0, 1)}
					</Avatar>
				}
				title={
					<Typography>
						{feedView && (
							<span>
								{user.firstName} {user.lastName}{' '}
							</span>
						)}
						{activeUser.id === entry.userId && container === 'feed' && <span>(you) </span>}
						<span>{convertDateTimeFromISO(entry.timeStarted).toLocaleString()}</span>
					</Typography>
				}
				action={
					<Tooltip title="Details" aria-label="details">
						<IconButton
							aria-label="details"
							onClick={() => history.push(`/entries/${Number(entry.id)}/details`)}
						>
							<MoreVertIcon />
						</IconButton>
					</Tooltip>
				}
			/>
			<CardContent style={{ backgroundColor: "almond"}}>
				<Typography component="p" variant="p">
					{entry.title}
				</Typography>
				{/* <Button onClick={() => history.push(`/entries/${Number(entry.id)}/details`)}>Details</Button> */}
				{historyView && (
					<Button color="secondary" onClick={() => history.push(`/home/${Number(entry.id)}/edit`)}>
						Edit
					</Button>
				)}
			</CardContent>
		</Card>
	);
}
