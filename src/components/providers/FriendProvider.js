import React, { useEffect, useState, useContext } from 'react';
import FriendRepository from '../../repositories/FriendRepository';
import { UserContext } from '../providers/UserProvider';

export const FriendContext = React.createContext();

export const FriendProvider = (props) => {
	const [ friends, setFriends ] = useState([]);
	const [ nonFriends, setNonFriends ] = useState([]);

	const { users, getLoggedInUser, loggedInUser } = useContext(UserContext);
	const activeUser = getLoggedInUser();

	const addNewFriend = (id) => {
        // console.log('add new friend')
		const newFriendObj = {
			userId: id,
			loggedInUserId: activeUser.id
        };
        // this should update both the friends and nonfriends arrays
		FriendRepository.addFriend(newFriendObj).then(() => {
            FriendRepository.getAllFriends(activeUser.id).then((newFriends)=>{
                // console.log('newFriends', newFriends)
                setFriends(newFriends)
            })
		});
    };
    
    useEffect(()=>{
        // console.log('friend provider friends updated')
        const filteredUsers = getNonFriends()
        setNonFriends(filteredUsers)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ friends ])

	const removeFriend = (relationId) => {
		FriendRepository.removeFriend(relationId).then(() => {
			// this should refresh the friends list
			FriendRepository.getAllFriends(activeUser.id).then(setFriends);
		});
    };
    
	const getNonFriends = () => {
		const filteredUsers = users.filter((user) => {
			let isFriend = false;
			if (user.id === activeUser.id) {
				return false;
			}
			for (const friend of friends) {
				if (user.id === friend.userId) {
					isFriend = true;
				}
			}
			return !isFriend;
		});
		return filteredUsers;
	}; 

	const filterNonFriends = (search) => {
		const nonFriends = getNonFriends()
		setNonFriends(nonFriends)
		const filteredNonFriends = nonFriends.filter((user)=> {
			let isMatch = false;
			// helps make search case insensitive
			const first = user.firstName.toLowerCase()
			const last = user.lastName.toLowerCase()
			const searchLowerCase = search.toLowerCase()
			if (first.indexOf(searchLowerCase) !== -1 || last.toLowerCase().indexOf(searchLowerCase) !== -1){
				isMatch = true
			}
			return isMatch
		})
		setNonFriends(filteredNonFriends)
	}

	useEffect(
		() => {
            // console.log('initial useEffect ran')
			// console.log('users', users)
			if (activeUser !== undefined){
				FriendRepository.getAllFriends(activeUser.id).then(setFriends).then(getNonFriends).then(setNonFriends);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[ users, loggedInUser ]
	);

	return (
		<FriendContext.Provider value={{ friends, nonFriends, removeFriend, addNewFriend, filterNonFriends }}>
			{props.children}
		</FriendContext.Provider>
	);
};
