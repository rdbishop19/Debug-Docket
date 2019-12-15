import React from 'react';
import { Paper, Typography, Button } from '@material-ui/core';

export default function FriendList({ friends, removeFriend }) {
	return (
		<Paper>
            <Typography variant="h5" component="h3">
                Friend List
            </Typography>
			{friends.map((friend) => {
				return (
					<Typography key={friend.id}>
						<span>{friend.user.firstName} </span>
						<span>{friend.user.lastName}</span>
                        <Button variant="contained" color="secondary" onClick={()=>removeFriend(friend.id)}>x</Button>
					</Typography>
				);
			})}
		</Paper>
	);
}