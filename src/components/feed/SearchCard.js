import React, { useState } from 'react'
import { Typography, Button } from '@material-ui/core'

export default function SearchCard({ user, addNewFriend }) {
    const [loadingStatus, setLoadingStatus] = useState(false)

	const handleClick = (id) => {
		setLoadingStatus(loadingStatus => !loadingStatus)
		addNewFriend(id)
	}
    return (
        <Typography component="div">
            <span>{user.firstName} </span>
            <span>{user.lastName}</span>
            <Button variant="contained" color="primary" onClick={()=> handleClick(user.id)} disabled={loadingStatus}>
                +
            </Button>
        </Typography>
    )
}