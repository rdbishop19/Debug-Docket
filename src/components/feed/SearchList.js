import React, { useState } from 'react';
import { Paper, Typography, Button, Input, TextField, Card, CardContent } from '@material-ui/core';
import SearchCard from './SearchCard';

export default function SearchList({ nonFriends, addNewFriend, filterNonFriends }) {
	const [ searchTerm, setSearchTerm ] = useState('');
	const input = React.createRef();

	const handleChange = (e) => {
		setSearchTerm(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		filterNonFriends(searchTerm);
		setSearchTerm('');
	};

	return (
		<React.Fragment>
			<Typography variant="h5" component="h3" style={{ textAlign: 'center' }}>
				<h3>Search Users</h3>
			</Typography>
			<Card>
				<form onSubmit={handleSubmit} style={{ textAlign: 'center', padding: '10px' }}>
					<TextField ref={input} placeholder="Enter name" value={searchTerm} onChange={handleChange} />
				</form>
				{nonFriends.length > 0 ? (
					nonFriends.map((user) => {
						return <SearchCard key={user.id} user={user} addNewFriend={addNewFriend} />;
					})
				) : (
					<CardContent>
						<Typography style={{ textAlign: 'center' }}>
							You're friends with everyone! #DevSourcerer
						</Typography>
					</CardContent>
				)}
			</Card>
		</React.Fragment>
	);
}
