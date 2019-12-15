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

    const createEntry = entry => EntryRepository.createEntry(entry)
    const getEntry = id => EntryRepository.getEntry(id)
    const updateEntry = newEntry => EntryRepository.updateEntry(newEntry)
    // loads users list when component mounts
    // empty array as second argument to only run once: https://stackoverflow.com/questions/53120972/how-to-call-loading-function-with-react-useeffect-only-once
    useEffect(() => {
        console.log('entry provider mount')
        EntryRepository.getAll().then(setEntries)
        EntryRepository.getUserEntries(activeUser.id).then(setUserEntries)
    }, [activeUser.id])

    return(
        <EntryContext.Provider value={{ entries, userEntries, createEntry, getEntry, updateEntry }}>
            {props.children}
        </EntryContext.Provider>
    )
}