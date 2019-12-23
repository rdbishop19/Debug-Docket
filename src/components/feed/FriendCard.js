import React, { useState } from 'react';
import { Typography, Button, Card, IconButton, CardContent, Tooltip, useTheme } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PersonIcon from '@material-ui/icons/Person';

export default function FriendCard({ friend, removeFriend }) {
	const [ loadingStatus, setLoadingStatus ] = useState(false);

	const handleClick = (id) => {
		setLoadingStatus((loadingStatus) => !loadingStatus);
		removeFriend(id);
	};

	const theme = useTheme();
	const { palette: { type /* primary, secondary, error */ } } = theme;

	return (
		<Card style={{ margin: '5px' }}>
			<CardContent style={{ padding: '0px 15px' }}>
				<Typography component="p">
					<Tooltip title="Unfollow friend" aria-label="remove-friend">
						<IconButton
							variant="contained"
							color="default"
							onClick={() => handleClick(friend.id)}
							disabled={loadingStatus}
						>
							<HighlightOffIcon />
						</IconButton>
					</Tooltip>
					<PersonIcon style={{ marginBottom: '-5px' }} color={type === 'light' ? 'primary' : 'secondary'} />
					<span>{friend.user.firstName} </span>
					<span>{friend.user.lastName}</span>
				</Typography>
			</CardContent>
		</Card>
	);
}
