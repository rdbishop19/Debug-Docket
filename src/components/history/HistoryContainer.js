import React, { useEffect, useState } from 'react';
import { EntryContext } from '../providers/EntryProvider';
import { UserContext } from '../providers/UserProvider';
import HistoryList from './HistoryList';
import { Input, Typography, Button } from '@material-ui/core';
import Dropdowns from '../inputform/Dropdowns'

export default function HistoryContainer(props) {
    const { entries, userEntries, getUserEntries } = React.useContext(EntryContext)
    const { getLoggedInUser } = React.useContext(UserContext)
    const [searchTerm, setSearchTerm] = useState('')

    const initialFilter = {
        isCompleted: false,
        priority: {
            id: '',
            label: 'n/a'
        },
        severity: {
            id: '',
            label: 'n/a'
        },
        category: {
            id: '',
            label: 'none'
        }
    }
    const [filter, setFilter] = useState(initialFilter)

    const activeUser = getLoggedInUser()
    const [filteredEntries, setFilteredEntries] = useState([])

    const handleChange = e => {
        setSearchTerm(e.target.value)
    }
    
    const handleSubmit = e => {
        e.preventDefault()
    }

    const handleRadioChange = e => {
        setFilter({...filter, [e.target.name]: { id: Number(e.target.value) }})
        // console.log('filter', filter)
    }

    const clearFilters = () =>{
        // setFilter(initialFilter)
        setFilteredEntries(userEntries)
    }
    // for when user selects radio dropdowns
    useEffect(()=>{
        // console.log('filtering')
        //reset list each time
        setFilteredEntries(userEntries)
        const filteredEntries = userEntries.filter((item)=>{
            const { severity, priority, category } = filter
            const { severityId, priorityId, categoryId } = item
            const severityMatch = severity.id === severityId && severity.id !== ''
            const priorityMatch = priority.id === priorityId && priority.id !== ''
            const categoryMatch = category.id === categoryId && category.id !== ''
            return severityMatch && priorityMatch && categoryMatch
        })
        // console.log('filteredEntries', filteredEntries)
        setFilteredEntries(filteredEntries)
    }, [filter])


    useEffect(()=>{
        // console.log('useEffect')
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

    const { priority, severity, category } = filter
    
	return (
        <React.Fragment>
            <Typography>SEARCH</Typography>
            <form onSubmit={handleSubmit}>
                <Input placeholder="Search by keyword" value={searchTerm} onChange={handleChange}/>
            </form>
            <br/><br/>
            <Typography>FILTER</Typography>
            <br/>
            <Dropdowns priority={priority} severity={severity} category={category} handleRadioChange={handleRadioChange}/>
            <Button variant="contained" color="secondary" onClick={clearFilters}>Clear Filters</Button>
            <br/><br/>
            <HistoryList entries={filteredEntries} isFiltering={userEntries > filteredEntries} activeUser={activeUser} {...props}/>
        </React.Fragment>
    )
}
