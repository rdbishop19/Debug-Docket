import React, { useState } from 'react';
import { Typography, Button, IconButton, Tooltip, Card, useTheme } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
export default function SearchCard({ user, addNewFriend }) {
	const [ loadingStatus, setLoadingStatus ] = useState(false);

	const handleClick = (id) => {
		setLoadingStatus((loadingStatus) => !loadingStatus);
		addNewFriend(id);
	};

	const theme = useTheme()
	const { palette: { type }} = theme
	return (
		<Card style={{ margin: '5px' }}>
		    <Typography component="div">
    			<Tooltip title="Add friend" aria-label="add-friend">
    				<IconButton
    					variant="contained"
    					color={type === 'light' ? 'primary' : 'secondary'}
    					onClick={() => handleClick(user.id)}
    					disabled={loadingStatus}
    				>
    					<PersonAddIcon />
    				</IconButton>
    			</Tooltip>
    			<span>{user.firstName} </span>
    			<span>{user.lastName}</span>
    		</Typography>
		</Card >
	);
}
