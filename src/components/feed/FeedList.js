import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import FeedCard from './FeedCard';

/* 
    Purpose: display the list of user and friend bug entries in a newsfeed format
    Author: Ryan Bishop
*/

export default function FeedList(props) {
	const { entries, user } = props;
	return (
		// <Paper>
		<React.Fragment>
			<Typography variant="h5" component="h3" style={{ textAlign: 'center' }}>
				<h3>Bug Feed</h3>
			</Typography>
			<div style={{ overflow: "auto", height: "450px"}}>
			    {entries.length > 0 ? (
    				entries.map((entry) => {
    					return <FeedCard key={entry.id} entry={entry} activeUser={user} container="feed" {...props} />;
    				})
    			) : (
    				<h5>No entries. Add friends to see their bugs along with yours.</h5>
    			)}
			</div>
		</React.Fragment>
		// </Paper>
	);
}
