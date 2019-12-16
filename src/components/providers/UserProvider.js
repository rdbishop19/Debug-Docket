import React, { useState, useEffect } from 'react'
import UserRepository from '../../repositories/UserRepository'

/* 
    Purpose: component to grab User contextual information for components that need it
    Author: Ryan Bishop
*/

// need this to send this data to other individual components to utilize the data
export const UserContext = React.createContext()

export const UserProvider = props => {
    const [users, setUsers] = useState([])
    const [loggedInUser, setLoggedInUser] = useState(null)
    const createAccount = user => UserRepository.createAccount(user)
    const findUser = (email, password) => UserRepository.findUser(email, password)
    const updateUserProfile = user => UserRepository.updateUserProfile(user)
    const getLoggedInUser = () => {
        const localUser = JSON.parse(localStorage.getItem("credentials"))
        if (localUser !== null){
            return localUser
        }
        const sessionUser = JSON.parse(sessionStorage.getItem("credentials"))
        if (sessionUser !== null){
            return sessionUser
        }
        // console.log('localUser', localUser)
        // console.log('sessionUser', sessionUser)
    }
    // loads users list when component mounts
    // empty array as second argument to only run once: https://stackoverflow.com/questions/53120972/how-to-call-loading-function-with-react-useeffect-only-once
    useEffect(() => {
        // console.log('userprovider mounted')
        UserRepository.getAll().then(setUsers)
    }, [loggedInUser])

    return(
        <UserContext.Provider value={{ users, createAccount, findUser, getLoggedInUser, updateUserProfile, setLoggedInUser }}>
            {props.children}
        </UserContext.Provider>
    )
}