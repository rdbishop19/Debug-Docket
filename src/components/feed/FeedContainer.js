import React, { useContext, useEffect, useState }  from 'react';
import FriendList from './FriendList';
import SearchList from './SearchList';
import FeedList from './FeedList';
import { UserContext } from '../providers/UserProvider'
import { FriendContext } from '../providers/FriendProvider';
import { EntryContext } from '../providers/EntryProvider';


export default function FeedContainer(props) {
    //get current logged in userId from state
    const { getLoggedInUser } = useContext(UserContext)
	const activeUser = getLoggedInUser()
	const [filteredEntries, setFilteredEntries] = useState([])

	//get current friends list
    const { friends, nonFriends, addNewFriend, removeFriend } = useContext(FriendContext)
	const { entries } = useContext(EntryContext)
	
	//TODO: get all entries from you and your friends
	useEffect(() => {
		// console.log('useEffect on Mount')
		// console.log('friends', friends)
		// console.log('entries', entries)
		const filteredArray = entries.filter((entry)=>{
				let isFriendEntry = false;
				if (entry.userId === activeUser.id) {
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
		setFilteredEntries(filteredArray)
    }, [friends, entries])
	return (

		    <React.Fragment>
    			<FriendList user={activeUser} friends={friends} removeFriend={removeFriend} {...props}/>
    			<SearchList nonFriends={nonFriends} addNewFriend={addNewFriend}/>
    			<FeedList entries={filteredEntries}/>
    		</React.Fragment>

	);
}