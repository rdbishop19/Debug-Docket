import React from 'react';

/* 
    Purpose: display the contents of each bug entry with styling and functionality
    Author: Ryan Bishop
*/

export default function FeedCard({ entry, user }) {
    console.log('entry', entry)
    
    //TODO: update this later during styline time
	let entryStyle = {
        backgroundColor: 'cornsilk',
        margin: "0 auto",
        padding: "5px"
	};
	if (entry.userId === user.id) {
		entryStyle = {
            ...entryStyle,
			backgroundColor: 'aquamarine'
		};
	}
	return (
		<div key={entry.id} style={entryStyle}>
			{entry.title}
		</div>
	);
}
