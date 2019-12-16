import React, { useEffect, useState } from 'react';
import { EntryContext } from '../providers/EntryProvider';
import { UserContext } from '../providers/UserProvider';
import HistoryList from './HistoryList';
import { Input, Typography } from '@material-ui/core';

export default function HistoryContainer(props) {
    const { entries, userEntries, getUserEntries } = React.useContext(EntryContext)
    const { getLoggedInUser } = React.useContext(UserContext)
    const [searchTerm, setSearchTerm] = useState('')

    const activeUser = getLoggedInUser()
    const [filteredEntries, setFilteredEntries] = useState([])

    const handleChange = e => {
        setSearchTerm(e.target.value)
    }
    
    const handleSubmit = e => {
        e.preventDefault()
    }

    useEffect(()=>{
        console.log('useEffect')
        setFilteredEntries(userEntries)
        const filteredEntries = userEntries.filter((entry)=>{
            const searchLower = searchTerm.toLowerCase()
            const title = entry.title.toLowerCase()
            const description = entry.description.toLowerCase()
            return title.includes(searchLower) || description.includes(searchLower)
        })
        setFilteredEntries(filteredEntries)
    }, [activeUser.id, entries, userEntries, searchTerm])

    useEffect(()=>{
        getUserEntries(activeUser.id).then(setFilteredEntries)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeUser.id])

	return (
        <React.Fragment>
            <Typography>SEARCH</Typography>
            <form onSubmit={handleSubmit}>
                <Input placeholder="Search by keyword" value={searchTerm} onChange={handleChange}/>
            </form>
            <HistoryList entries={filteredEntries} activeUser={activeUser} {...props}/>
        </React.Fragment>
    )
}
