import React, { useState } from 'react';
import { Typography, Button, Card, IconButton, CardContent, Tooltip } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PersonIcon from '@material-ui/icons/Person';

export default function FriendCard({ friend, removeFriend }) {
	const [ loadingStatus, setLoadingStatus ] = useState(false);

	const handleClick = (id) => {
		setLoadingStatus((loadingStatus) => !loadingStatus);
		removeFriend(id);
	};
	return (
		<Card style={{ margin: '5px' }}>
			<CardContent style={{ padding: "0px 15px"}}>
				<Typography component="p">
                    <PersonIcon style={{ marginBottom: "-5px"}} color="primary"/>
					<span>{friend.user.firstName} </span>
					<span>{friend.user.lastName}</span>
					<Tooltip title="Remove friend" aria-label="remove-friend">
					    <IconButton
    						variant="contained"
    						color="default"
    						onClick={() => handleClick(friend.id)}
    						disabled={loadingStatus}
    					>
    						<HighlightOffIcon />
    					</IconButton>
					</Tooltip>
				</Typography>
			</CardContent>
		</Card>
	);
}
