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
    const createAccount = user => UserRepository.createAccount(user)
    const findUser = (email, password) => UserRepository.findUser(email, password)
    // loads users list when component mounts
    // empty array as second argument to only run once: https://stackoverflow.com/questions/53120972/how-to-call-loading-function-with-react-useeffect-only-once
    useEffect(() => {
        UserRepository.getAll().then(setUsers)
    }, [])

    return(
        <UserContext.Provider value={{ users, createAccount, findUser }}>
            {props.children}
        </UserContext.Provider>
    )
}