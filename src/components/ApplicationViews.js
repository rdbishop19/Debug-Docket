import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import EntriesContainer from './entries/EntriesContainer'
import TimerContainer from './timer/TimerContainer'
import EntryDetailsContainer from './entries/EntryDetailsContainer'
import FeedContainer from './feed/FeedContainer'
import HistoryContainer from './history/HistoryContainer'

export class ApplicationViews extends Component {
    render() {
        return (

            <React.Fragment>
                
                <Route path="/home" render={(props) => {
                    return <>
                            <TimerContainer {...props} />
                            <EntriesContainer {...props} />
                        </>
                }} />

                <Route path="/login" render={(props) => {
                    return <Login {...props} />
                }} />
                <Route path="/register" render={(props) => {
                    return <Register {...props} />
                }} />

                <Route exact path="/entries/:entryId(\d+)/details" render={(props)=>{
                    return <EntryDetailsContainer {...props} />
                }} />

                <Route path="/feed" render={(props)=>{
                    return <FeedContainer {...props} />
                }} />

                <Route path="/history" render={(props)=>{
                    return <HistoryContainer {...props} />
                }} />

            </React.Fragment>
        )
    }
}

export default ApplicationViews
