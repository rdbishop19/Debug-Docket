import React, { useState, useEffect } from 'react'
import EntryRepository from '../../repositories/EntryRepository'
/* 
    Purpose: component to grab Entry contextual information for components that need it
    Author: Ryan Bishop
*/

// need this to send this data to other individual components to utilize the data
export const EntryContext = React.createContext()

export const EntryProvider = props => {
    const [entries, setEntries] = useState([])
    const createEntry = entry => EntryRepository.createEntry(entry)
    const getEntry = id => EntryRepository.getEntry(id)
    // loads users list when component mounts
    // empty array as second argument to only run once: https://stackoverflow.com/questions/53120972/how-to-call-loading-function-with-react-useeffect-only-once
    useEffect(() => {
        EntryRepository.getAll().then(setEntries)
    }, [])

    return(
        <EntryContext.Provider value={{ entries, createEntry, getEntry }}>
            {props.children}
        </EntryContext.Provider>
    )
}