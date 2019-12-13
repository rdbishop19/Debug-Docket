import React from 'react';
import { Button, Card, CardContent } from '@material-ui/core';

/* 
    Purpose: display the contents of each bug entry with styling and functionality
    Author: Ryan Bishop
*/

function convertDateTimeFromISO(date) {
    return new Date(date)
}

export default function FeedCard({ entry, activeUser, container }) {
    const { user } = entry
    // console.log('entry', entry)
    const feed = container === "feed"
    const history = container === "history"
    //TODO: update this later during styline time
	let entryStyle = {
        backgroundColor: 'cornsilk',
        margin: "10px 10px",
        padding: "5px"
	};
	if (entry.userId === activeUser.id) {
		entryStyle = {
            ...entryStyle,
			backgroundColor: 'aquamarine'
		};
	}
	return (
		<Card key={entry.id} style={entryStyle}>
            <CardContent>
                {feed && <span>{user.firstName} {user.lastName} </span>}
                {activeUser.id === entry.userId && container === "feed" && <span>(you) </span>}
                <span>{convertDateTimeFromISO(entry.timeStarted).toLocaleString()}</span>
                <p>{entry.title}</p>
                <Button>Details</Button>
                {history && <Button color="secondary">Edit</Button>}
            </CardContent>
		</Card>
	);
}
