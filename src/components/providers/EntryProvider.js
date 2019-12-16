import React, { useState, useEffect, useContext } from 'react'
import EntryRepository from '../../repositories/EntryRepository'
import { UserContext } from './UserProvider'

/* 
    Purpose: component to grab Entry contextual information for components that need it
    Author: Ryan Bishop
*/

// need this to send this data to other individual components to utilize the data
export const EntryContext = React.createContext()

export const EntryProvider = props => {
    const [entries, setEntries] = useState([])
    const [userEntries, setUserEntries] = useState([])
    const { getLoggedInUser } = useContext(UserContext)
    const activeUser = getLoggedInUser()
    let userId
    if (activeUser){
        userId = activeUser.id
    }

    const createEntry = entry => EntryRepository.createEntry(entry)
    const getEntry = id => EntryRepository.getEntry(id)
    const updateEntry = newEntry => EntryRepository.updateEntry(newEntry)
    const getUserEntries = () => EntryRepository.getUserEntries(userId).then(setUserEntries)
    const deleteEntry = id => EntryRepository.delete(id).then(getUserEntries).then(setEntries)
    // loads users list when component mounts
    // empty array as second argument to only run once: https://stackoverflow.com/questions/53120972/how-to-call-loading-function-with-react-useeffect-only-once
    useEffect(() => {
        // console.log('entry provider updated')
        // console.log('entry provider user', activeUser)
        EntryRepository.getAll().then(setEntries)
    }, [userId])

    useEffect(()=>{
        EntryRepository.getUserEntries(userId).then(setUserEntries)
    }, [userId])

    return(
        <EntryContext.Provider value={{ entries, userEntries, createEntry, getEntry, updateEntry, getUserEntries, deleteEntry }}>
            {props.children}
        </EntryContext.Provider>
    )
}