import React from 'react'
import EntriesHomeContainer from './EntriesHomeContainer'
import { Route } from 'react-router-dom'
import EntryEdit from './EntryEdit'

export default function EntriesContainer(props) {
    const { match } = props

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
