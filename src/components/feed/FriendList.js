import React, { useState } from 'react';
import { Paper, Typography, Button } from '@material-ui/core';
import FriendCard from './FriendCard';

export default function FriendList({ friends, removeFriend }) {
	return (
		<Paper>
            <Typography variant="h5" component="h3">
                Friend List
            </Typography>
			{friends.map((friend) => {
				return (
					<FriendCard key={friend.id} friend={friend} removeFriend={removeFriend}/>
				);
			})}
		</Paper>
	);
}