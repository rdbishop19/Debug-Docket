import React, { Component } from 'react'
import EntriesHomeContainer from './EntriesHomeContainer'
import { Route } from 'react-router-dom'
import EntryEdit from './EntryEdit'
export class EntriesContainer extends Component {
    render() {
        const { match } = this.props
        return (
            <React.Fragment>

                <Route exact path={`${match.path}`} render={(props)=>{
                    return <EntriesHomeContainer {...props} />
                }} />
                {/* Note: had to use doubleslash for regex after changing path to JS expression */}
                <Route path={`${match.path}/:entryId(\\d+)/edit`} render={(props)=>{
                    return <EntryEdit {...props} />
                }} />

            </React.Fragment>
        )
    }
}

export default EntriesContainer
