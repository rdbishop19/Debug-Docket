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
		const newFriendObj = {
			userId: id,
			loggedInUserId: activeUser.id
		};
		FriendRepository.addFriend(newFriendObj).then(() => {
            FriendRepository.getAllFriends(activeUser.id).then(setFriends)
            .then(getNonFriends).then(setNonFriends);
		});
	};

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

	useEffect(
		() => {
			FriendRepository.getAllFriends(activeUser.id).then(setFriends).then(getNonFriends).then(setNonFriends);
		},
		[ users ]
	);

	return (
		<FriendContext.Provider value={{ friends, nonFriends, removeFriend, addNewFriend }}>
			{props.children}
		</FriendContext.Provider>
	);
};
