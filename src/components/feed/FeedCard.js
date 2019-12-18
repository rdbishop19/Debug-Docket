import React from 'react';
import { Button, Card, CardContent, Typography } from '@material-ui/core';

/* 
    Purpose: display the contents of each bug entry with styling and functionality
    Author: Ryan Bishop
*/

function convertDateTimeFromISO(date) {
	return new Date(date);
}

export default function FeedCard(props) {
	const { entry, activeUser, container, history } = props;
	const { user } = entry;
	// console.log('entry', entry)
	const feedView = container === 'feed';
	const historyView = container === 'history';
	//TODO: update this later during styline time
	let entryStyle = {
		backgroundColor: '#a7ffeb',
		margin: '10px 10px',
		padding: '5px'
	};
	if (entry.userId === activeUser.id) {
		entryStyle = {
			...entryStyle,
			backgroundColor: 'salmon'
		};
	}

	return (
		<Card key={entry.id} style={entryStyle}>
			<CardContent>
				<Typography component="h5" variant="h6">
					{feedView && (
						<span>
							{user.firstName} {user.lastName}{' '}
						</span>
					)}
					{activeUser.id === entry.userId && container === 'feed' && <span>(you) </span>}
					<span>{convertDateTimeFromISO(entry.timeStarted).toLocaleString()}</span>
				</Typography>
				<Typography component="p" variant="h5">
					{entry.title}
				</Typography>
				<Button onClick={() => history.push(`/entries/${Number(entry.id)}/details`)}>Details</Button>
				{historyView && (
					<Button color="secondary" onClick={() => history.push(`/home/${Number(entry.id)}/edit`)}>
						Edit
					</Button>
				)}
			</CardContent>
		</Card>
	);
}
