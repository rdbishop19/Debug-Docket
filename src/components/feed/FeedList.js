import React from 'react'
import { Paper, Typography } from '@material-ui/core'

export default function FeedList({ entries }) {
    console.log('test entries', entries)
    return (
        <Paper>
            <Typography>
                BUG FEED
            </Typography>
            {entries.map((entry)=>{
                return <Paper key={entry.id}>
                    {entry.title}
                </Paper>
            })}
        </Paper>
    )
}
