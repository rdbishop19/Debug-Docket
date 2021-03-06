import React, { useState } from 'react';
import { Paper, Typography, Button, Card, CardContent } from '@material-ui/core';
import FriendCard from './FriendCard';

export default function FriendList({ friends, removeFriend }) {
	return (
		<React.Fragment>
			<Typography variant="h6" component="h3" style={{ textAlign: 'center' }}>
				FRIEND LIST
			</Typography>
			<Card style={{ overflow: "auto", height: "83vh", margin: "5px"}}>
				{friends.length > 0 ? (
					friends.map((friend) => {
						return <FriendCard key={friend.id} friend={friend} removeFriend={removeFriend} />;
					})
				) : (
					<CardContent>
						<Typography style={{ textAlign: 'center' }}>
							Add friends to see what bugs they're working on
						</Typography>
					</CardContent>
				)}
			</Card>
		</React.Fragment>
	);
}
