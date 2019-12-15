import React, { useEffect, useState } from 'react';
import { EntryContext } from '../providers/EntryProvider';
import { UserContext } from '../providers/UserProvider';
import HistoryList from './HistoryList';
import { Input, Typography } from '@material-ui/core';

export default function HistoryContainer(props) {
    const { entries } = React.useContext(EntryContext)
    const { getLoggedInUser } = React.useContext(UserContext)
    const [searchTerm, setSearchTerm] = useState('')

    const activeUser = getLoggedInUser()
    const [userEntries, setUserEntries] = useState([])

    const handleChange = e => {
        setSearchTerm(e.target.value)
    }
    
    const handleSubmit = e => {
        e.preventDefault()
    }

    useEffect(()=>{
        const userEntries = entries.filter((entry)=>{
            return (entry.userId === activeUser.id)
        })
        setUserEntries(userEntries)
        const filteredEntries = userEntries.filter((entry)=>{
            const searchLower = searchTerm.toLowerCase()
            const title = entry.title.toLowerCase()
            const description = entry.description.toLowerCase()
            return title.includes(searchLower) || description.includes(searchLower)
        })
        // console.log('filteredEntries', filteredEntries)
        setUserEntries(filteredEntries)
    }, [activeUser.id, entries, searchTerm])

    useEffect(()=>{
        // console.log('entries', entries);
        const userEntries = entries.filter((entry)=>{
            return (entry.userId === activeUser.id)
        })
        setUserEntries(userEntries)
    }, [activeUser.id, entries])

	return (
        <React.Fragment>
            <Typography>SEARCH</Typography>
            <form onSubmit={handleSubmit}>
                <Input placeholder="Search by keyword" value={searchTerm} onChange={handleChange}/>
            </form>
            <HistoryList entries={userEntries} activeUser={activeUser} {...props}/>
        </React.Fragment>
    )
}
