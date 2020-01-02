import React, { useContext } from 'react';
import {
	Button,
	Card,
	CardContent,
	Typography,
	makeStyles,
	Avatar,
	CardHeader,
	IconButton,
	Tooltip,
	useTheme
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import { UserContext } from '../providers/UserProvider';
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
	},
	tooltip: {
		maxWidth: 'none',
		backgroundColor: 'black',
		fontSize: '1.3em'
	}
}));
function convertDateTimeFromISO(date) {
	return new Date(date);
}

export default function FeedCard(props) {
	const classes = useStyles();
	const { entry, activeUser, container, history, deleteHistoryEntry } = props;
	const { user, isCompleted, timeStarted, timeCompleted } = entry;
	const feedView = container === 'feed';
	const historyView = container === 'history';

	const { getLoggedInUser } = useContext(UserContext);
	const activeUserId = getLoggedInUser().id;
	const isLoggedInUserEntry = activeUserId === entry.userId;

	const theme = useTheme();
	const { palette: { type, primary, secondary, error } } = theme;
	// default view + show all open bugs with red background
	let entryStyle = {
		backgroundColor: type === 'light' ? error.main : error.dark,
		margin: '10px 10px',
		padding: '3px',
		borderRadius: '5px'
	};
	// display color change if bug has been solved/closed
	if (entry.isCompleted) {
		entryStyle = {
			...entryStyle,
			backgroundColor: type === 'light' ? secondary.light : secondary.dark
		};
	}

	const styles = {
		title: {
			fontSize: '1.5em'
		},
		headers: {
			fontWeight: '800'
		},
		subheader: {
			backgroundColor: isCompleted ? primary.dark : 'white',
			color: isCompleted ? 'white' : 'black',
			width: '100px',
			borderRadius: '4px',
			margin: '0 10px',
			padding: '5px',
			textAlign: 'center'
		},
		datetime: {
			cursor: 'pointer',
			borderBottom: '0.5px dotted #666'
		}
	};

	const status = isCompleted ? 'Closed' : 'Opened';
	const timeDisplay = isCompleted ? timeCompleted : timeStarted;

	return (
		<Card key={entry.id} style={{ margin: '5px 5px' }}>
			<CardHeader
				style={entryStyle}
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
						{feedView &&
							<span>
								{activeUserId === entry.userId ? <span>(you) </span> :
								<React.Fragment>{entry.user.firstName} {entry.user.lastName}{' '}</React.Fragment>
								}
							</span>
						}
						<span style={styles.subheader}>{status.toUpperCase()}</span>
						<Tooltip
							title={`${status} on ${new Date(timeDisplay).toString()}`}
							arrow
							placement="top"
							classes={{ tooltip: classes.tooltip }}
						>
							<span style={styles.datetime}>{moment(timeDisplay).fromNow()}</span>
						</Tooltip>
					</Typography>
				}
				action={
					<div style={{ paddingTop: "15px", textAlign: "center" }}>
						{isLoggedInUserEntry && (
							<React.Fragment>
								<Tooltip title="Edit" aria-label="edit">
									<IconButton onClick={() => history.push(`/home/${entry.id}/edit`)}>
										<EditIcon />
									</IconButton>
								</Tooltip>
								<Tooltip title="Delete" aria-label="delete">
									<IconButton onClick={() => deleteHistoryEntry(entry.id)}>
										<DeleteIcon />
									</IconButton>
								</Tooltip>
							</React.Fragment>
						)}

						<Tooltip title="Details" aria-label="details">
							<IconButton
								aria-label="details"
								// size="small"
								// style={{ marginTop: '5px' }}
								onClick={() => history.push(`/entries/${Number(entry.id)}/details`)}
							>
								<MoreVertIcon />
							</IconButton>
						</Tooltip>

						{/* <Tooltip title="Go back" aria-label="go-back">
								<IconButton onClick={history.goBack}>
									<ArrowBackIcon />
								</IconButton>
							</Tooltip> */}
					</div>
				}
				// subheader={<div style={styles.subheader}>{status}</div>}
			/>
			<CardContent style={{ backgroundColor: 'almond' }}>
				<Typography>{entry.title}</Typography>
				{/* <Button onClick={() => history.push(`/entries/${Number(entry.id)}/details`)}>Details</Button> */}
				{/* {historyView && (
					<Button color="secondary" onClick={() => history.push(`/home/${Number(entry.id)}/edit`)}>
						Edit
					</Button>
				)} */}
			</CardContent>
		</Card>
	);
}
