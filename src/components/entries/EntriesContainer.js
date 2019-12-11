import React, { useContext } from 'react'
import EntriesHomeContainer from './EntriesHomeContainer'
import { Route, useState } from 'react-router-dom'
import EntryEdit from './EntryEdit'
import Settings from '../../repositories/Settings'

export default function EntriesContainer(props) {
    const { match } = props



    const getEntryInfo = id => {
        console.log('getEntryInfo')
        return fetch(`${Settings.remoteURL}/entries/${id}?_expand=severity&_expand=priority&_expand=category`)
        .then((data)=>data.json())
    }

    return (
        <div style={{ flex: 1, minWidth: "375px"}}>

            <Route exact path={`${match.path}`} render={(props)=>{
                return <EntriesHomeContainer {...props} />
            }} />
            {/* Note: had to use doubleslash for regex after changing path to JS expression */}
            <Route path={`${match.path}/:entryId(\\d+)/edit`} render={(props)=>{
                return <EntryEdit {...props} />
            }} />

        </div>
    )
}
