import React from 'react';
import { Button, Card, CardContent } from '@material-ui/core';
import { Link } from 'react-router-dom';

/* 
    Purpose: display the contents of each bug entry with styling and functionality
    Author: Ryan Bishop
*/

function convertDateTimeFromISO(date) {
    return new Date(date)
}

export default function FeedCard( props) {
    const { entry, activeUser, container, history, match } = props
    const { user } = entry
    // console.log('entry', entry)
    const feedView = container === "feed"
    const historyView = container === "history"
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
                {feedView && <span>{user.firstName} {user.lastName} </span>}
                {activeUser.id === entry.userId && container === "feed" && <span>(you) </span>}
                <span>{convertDateTimeFromISO(entry.timeStarted).toLocaleString()}</span>
                <p>{entry.title}</p>
                <Button onClick={()=> history.push(`/entries/${Number(entry.id)}/details`)}>Details</Button>
                {historyView && <Button color="secondary" onClick={()=> history.push(`/home/${Number(entry.id)}/edit`)}>Edit</Button>}
            </CardContent>
		</Card>
	);
}
