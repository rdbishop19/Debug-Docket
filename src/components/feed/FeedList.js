import React from 'react'
import { Paper, Typography } from '@material-ui/core'
import FeedCard from './FeedCard'

/* 
    Purpose: display the list of user and friend bug entries in a newsfeed format
    Author: Ryan Bishop
*/

export default function FeedList({ entries, user }) {
    return (
        <Paper>
            <Typography variant="h5" component="h3">Bug Feed</Typography>
            {entries.length && entries.map((entry)=>{
                return <FeedCard entry={entry} user={user} />
            })}
        </Paper>
    )
}
