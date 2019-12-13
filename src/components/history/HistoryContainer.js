import React, { useEffect, useState } from 'react';
import { EntryContext } from '../providers/EntryProvider';
import { UserContext } from '../providers/UserProvider';
import HistoryList from './HistoryList';

export default function HistoryContainer(props) {
    const { entries } = React.useContext(EntryContext)
    const { getLoggedInUser } = React.useContext(UserContext)

    const activeUser = getLoggedInUser()
    const [userEntries, setUserEntries] = useState([])

    useEffect(()=>{
        // console.log('entries', entries);
        const userEntries = entries.filter((entry)=>{
            return (entry.userId === activeUser.id)
        })
        setUserEntries(userEntries)
    }, [ entries ])

	return (
        <HistoryList entries={userEntries} activeUser={activeUser} />
    )
}
