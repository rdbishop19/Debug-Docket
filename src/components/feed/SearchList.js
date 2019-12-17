import React, { useState } from 'react';
import { Paper, Typography, Button, Input } from '@material-ui/core';
import SearchCard from './SearchCard'

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
				return <SearchCard key={user.id} user={user} addNewFriend={addNewFriend}/>
			})}
		</Paper>
	);
}
