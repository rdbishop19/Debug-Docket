import React, { useEffect, useState, useContext } from 'react';
import FriendRepository from '../../repositories/FriendRepository';
import { UserContext } from '../providers/UserProvider';

export const FriendContext = React.createContext();

export const FriendProvider = (props) => {
	const [ friends, setFriends ] = useState([]);
	const [ nonFriends, setNonFriends ] = useState([]);

	const { users, getLoggedInUser } = useContext(UserContext);
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
            // .then(getNonFriends).then((filteredUsers)=>{
            //     console.log('filtered users', filteredUsers)
            //     setNonFriends(filteredUsers)
            // })
		});
    };
    
    useEffect(()=>{
        // console.log('new useEffect hook ran')
        const filteredUsers = getNonFriends()
        setNonFriends(filteredUsers)
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
			if (user.firstName.toLowerCase().indexOf(search) !== -1 || user.lastName.toLowerCase().indexOf(search) !== -1){
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
			FriendRepository.getAllFriends(activeUser.id).then(setFriends).then(getNonFriends).then(setNonFriends);
		},
		[ users ]
	);

	return (
		<FriendContext.Provider value={{ friends, nonFriends, removeFriend, addNewFriend, filterNonFriends }}>
			{props.children}
		</FriendContext.Provider>
	);
};
