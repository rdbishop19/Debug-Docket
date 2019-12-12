import React, { useEffect, useState, useContext } from 'react'
import FriendRepository from '../../repositories/FriendRepository'
import { UserContext } from '../providers/UserProvider'

export const FriendContext = React.createContext()

export const FriendProvider = props => {
    const [friends, setFriends] = useState([])
    
    const { getLoggedInUser } = useContext(UserContext)
    const user = getLoggedInUser()

    const removeFriend = (relationId) => {
        FriendRepository.removeFriend(relationId)
            .then(()=>{
                // this should refresh the friends list
                FriendRepository.getAllFriends(user.id).then(setFriends)
            })
    }
    
    useEffect(() => {
        FriendRepository.getAllFriends(user.id).then(setFriends)
    }, [])

    return(
        <FriendContext.Provider value={{ friends, removeFriend }}>
            {props.children}
        </FriendContext.Provider>
    )
}
