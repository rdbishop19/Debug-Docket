import React from 'react';

/* 
    Purpose: display the contents of each bug entry with styling and functionality
    Author: Ryan Bishop
*/

function convertDateTimeFromISO(date) {
    return new Date(date)
}

export default function FeedCard({ entry, activeUser }) {
    const { user } = entry
    // console.log('entry', entry)
    
    //TODO: update this later during styline time
	let entryStyle = {
        backgroundColor: 'cornsilk',
        margin: "0 auto",
        padding: "5px"
	};
	if (entry.userId === activeUser.id) {
		entryStyle = {
            ...entryStyle,
			backgroundColor: 'aquamarine'
		};
	}
	return (
		<div key={entry.id} style={entryStyle}>
			<span>{user.firstName} {user.lastName} </span>
            {activeUser.id === entry.userId && <span>(you) </span>}
            <span>on </span><span>{convertDateTimeFromISO(entry.timeStarted).toLocaleString()}</span>
            <p>{entry.title}</p>


		</div>
	);
}
