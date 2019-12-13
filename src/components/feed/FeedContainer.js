import React, { useContext }  from 'react';
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

	//get current friends list
    const { friends, nonFriends, addNewFriend, removeFriend } = useContext(FriendContext)
    const { entries } = useContext(EntryContext)

	//TODO: get all entries from you and your friends
	return (

		    <React.Fragment>
    			<FriendList user={activeUser} friends={friends} removeFriend={removeFriend} {...props}/>
    			<SearchList nonFriends={nonFriends} addNewFriend={addNewFriend}/>
    			<FeedList entries={entries}/>
    		</React.Fragment>

	);
}