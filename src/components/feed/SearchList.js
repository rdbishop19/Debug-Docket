import React from 'react';
import { Paper, Typography, Button } from '@material-ui/core';

export default function SearchList({ nonFriends, addNewFriend }) {
	return (
		<Paper>
			<Typography>Search Friends</Typography>
			{nonFriends.map((user) => {
				return (
					<Typography key={user.id} component="div">
						<span>{user.firstName} </span>
						<span>{user.lastName}</span>
						<Button variant="contained" color="primary" onClick={() => addNewFriend(user.id)}>
							+
						</Button>
					</Typography>
				);
			})}
		</Paper>
	);
}
