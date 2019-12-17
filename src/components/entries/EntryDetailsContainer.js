import React, { useContext, useState, useEffect } from 'react';
import { EntryContext } from '../providers/EntryProvider';
import { UserContext } from '../providers/UserProvider';
import EntryDetailsCard from './EntryDetailsCard';

export default function EntryDetailsContainer({ history, match }) {

    const { entryId } = match.params
    const { entries, deleteEntry, getUserEntries } = useContext(EntryContext)
    const [userEntries, setUserEntries] = useState([])
    const [currentEntry, setCurrentEntry] = useState([])
    const { getLoggedInUser } = React.useContext(UserContext)

    useEffect(()=>{
        const displayedEntry = entries.filter((entry)=>{
            return (entry.id === Number(entryId))
        })
        setCurrentEntry(displayedEntry)
        // console.log('displayentry', displayedEntry)
    }, [userEntries])

    useEffect(()=>{
        // console.log('useEffect mounted')
        // console.log('entries', entries)
        const activeUser = getLoggedInUser()
        const filteredUserEntries = entries.filter((entry)=>{
            return (entry.userId === activeUser.id)
        })
        setUserEntries(filteredUserEntries)
    }, [entries, getLoggedInUser])

    useEffect(()=>{
        getUserEntries()
    }, [])

	return (
        <React.Fragment>
            {currentEntry.map((entry)=>{
                return <EntryDetailsCard key={entry.id} entry={entry} history={history} deleteEntry={deleteEntry}/>
            })}
        </React.Fragment>
    )
}
