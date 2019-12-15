import React, { useContext, useState, useEffect } from 'react';
import { EntryContext } from '../providers/EntryProvider';
import { UserContext } from '../providers/UserProvider';
import EntryDetailsCard from './EntryDetailsCard';

export default function EntryDetailsContainer({ history, match }) {

    const { entryId } = match.params
    const { entries } = useContext(EntryContext)
    const [userEntries, setUserEntries] = useState([])
    const initialValue = {
        title: '',
        description: ''
    }
    const [currentEntry, setCurrentEntry] = useState([])

    const { getLoggedInUser } = React.useContext(UserContext)

    const activeUser = getLoggedInUser()

    useEffect(()=>{
        const displayedEntry = userEntries.filter((entry)=>{
            return (entry.id === Number(entryId))
        })
        setCurrentEntry(displayedEntry)
        console.log('displayentry', displayedEntry)
    }, [userEntries])

    useEffect(()=>{
        console.log('useEffect mounted')
        console.log('entries', entries)
        const filteredUserEntries = entries.filter((entry)=>{
            return (entry.userId === activeUser.id)
        })
        setUserEntries(filteredUserEntries)
    }, [ entries ])

	return (
        <EntryDetailsCard entry={currentEntry}/>
    )
}
