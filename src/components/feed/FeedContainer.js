import React, { useContext, useEffect, useState } from 'react';
import FriendList from './FriendList';
import SearchList from './SearchList';
import FeedList from './FeedList';
import { UserContext } from '../providers/UserProvider';
import { FriendContext } from '../providers/FriendProvider';
import { EntryContext } from '../providers/EntryProvider';
import EntryRepository from '../../repositories/EntryRepository';
import { Grid } from '@material-ui/core';

export default function FeedContainer(props) {
	//get current logged in userId from state
	const { getLoggedInUser } = useContext(UserContext);
	const activeUser = getLoggedInUser();
	const userId = activeUser.id;

	//get current friends list
	const { friends, nonFriends, addNewFriend, removeFriend, filterNonFriends } = useContext(FriendContext);
	// const { entries, userEntries, setEntries } = useContext(EntryContext)
	const [ entries, setEntries ] = useState([]);
	const [ filteredEntries, setFilteredEntries ] = useState([]);
	//TODO: get all entries from you and your friends
	useEffect(() => {
		// console.log('feedContainer', getLoggedInUser())
		// console.log('friends', friends)
		// console.log('entries', entries)
		EntryRepository.getAll().then(setEntries);
	}, []);

	useEffect(
		() => {
			const filteredArray = entries.filter((entry) => {
				let isFriendEntry = false;
				if (entry.userId === userId) {
					return true;
				}
				for (const friend of friends) {
					if (entry.userId === friend.userId) {
						isFriendEntry = true;
					}
				}
				return isFriendEntry;
			});
			// console.log('filteredArray', filteredArray)
			setFilteredEntries(filteredArray);
		},
		[ entries, userId, friends, nonFriends ]
	);

	return (
		<React.Fragment>
			<Grid container spacing={3}>
				<Grid item xs={6} sm={3}>
					<FriendList user={activeUser} friends={friends} removeFriend={removeFriend} {...props} />
				</Grid>
				<Grid item xs={6} sm={6}>
					<FeedList user={activeUser} entries={filteredEntries} {...props} />
				</Grid>
				<Grid item xs={6} sm={3}>
					<SearchList
						nonFriends={nonFriends}
						addNewFriend={addNewFriend}
						filterNonFriends={filterNonFriends}
					/>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}
