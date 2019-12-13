import React from 'react'
import { Paper, Typography } from '@material-ui/core'
import FeedCard from '../feed/FeedCard'

/* 
    Purpose: display the list of user bug entries in a filterable History format
    Author: Ryan Bishop
*/
export default function HistoryList({ entries, activeUser }) {
    return (
        <Paper>
            <Typography>
                HISTORY LIST
            </Typography>
            {entries.length > 0 ? entries.map((entry)=>{
                return <FeedCard key={entry.id} entry={entry} activeUser={activeUser} container="history"/>
            }) : <h5>No entries. Add a new bug to start your tracking journey.</h5>}
        </Paper>
    )
}
