import React, { useEffect, useState, useContext } from 'react'
import FriendRepository from '../../repositories/FriendRepository'
import { UserContext } from '../providers/UserProvider'

export const FriendContext = React.createContext()

export const FriendProvider = props => {
    const [friends, setFriends] = useState([])
    
    const { getLoggedInUser } = useContext(UserContext)
    const user = getLoggedInUser()

    const friendRelationship = (friendObj, friendId) => {
        return friendObj.userId === friendId && friendObj.loggedInUserId === user.id
    }
    const removeFriend = (friendId) => {
        //get relationship endpoint id based on userId
        const found = friends.find((relation)=>{
            // console.log('remove friend')
            return friendRelationship(relation, friendId)
        })
        if (found){
            // console.log('found', found.id)
            FriendRepository.removeFriend(found.id)
        }
    }
    removeFriend(4)
    
    useEffect(() => {
        FriendRepository.getAllFriends(user.id).then(setFriends)
    }, [])

    return(
        <FriendContext.Provider value={{ friends, removeFriend }}>
            {props.children}
        </FriendContext.Provider>
    )
}
