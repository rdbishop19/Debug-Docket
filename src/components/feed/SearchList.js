import React, { useState } from 'react';
import { Paper, Typography, Button, Input, FormHelperText } from '@material-ui/core';

export default function SearchList({ nonFriends, addNewFriend, filterNonFriends }) {
	const [searchTerm, setSearchTerm] = useState("")
	const input = React.createRef()

	const handleChange = e => {
		setSearchTerm(e.target.value)
	}
	
	const handleSubmit = e => {
		e.preventDefault()
		filterNonFriends(searchTerm)
		setSearchTerm('')
	}
	
	return (
		<Paper>
			<Typography variant="h5" component="h3">Search Friends</Typography>
			<form onSubmit={handleSubmit}>
				<Input ref={input} placeholder="Enter name" value={searchTerm} onChange={handleChange}/>
			</form>
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
