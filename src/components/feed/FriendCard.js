import React, { useState } from 'react'
import { Typography, Button } from '@material-ui/core'

export default function FriendCard({ friend, removeFriend }) {
    const [loadingStatus, setLoadingStatus] = useState(false)

	const handleClick = (id) => {
		setLoadingStatus(loadingStatus => !loadingStatus)
		removeFriend(id)
	}
    return (
        <Typography >
            <span>{friend.user.firstName} </span>
            <span>{friend.user.lastName}</span>
            <Button variant="contained" color="secondary" onClick={()=> handleClick(friend.id)} disabled={loadingStatus}>x</Button>
        </Typography>
    )
}
