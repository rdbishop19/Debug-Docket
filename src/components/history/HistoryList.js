import React from 'react'
import { Paper, Typography } from '@material-ui/core'
import FeedCard from '../feed/FeedCard'

/* 
    Purpose: display the list of user bug entries in a filterable History format
    Author: Ryan Bishop
*/
export default function HistoryList(props) {
    const { entries, activeUser } = props
    console.log('props history list', props)
    return (
        <Paper>
            <Typography>
                HISTORY LIST
            </Typography>
            {entries.length > 0 ? entries.map((entry)=>{
                return <FeedCard id={entry.id} key={entry.id} entry={entry} activeUser={activeUser} container="history" {...props}/>
            }) : <h5>No entries. Add a new bug to start your tracking journey.</h5>}
        </Paper>
    )
}
