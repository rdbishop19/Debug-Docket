import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import AuthRoute from './auth/AuthRoute'
import Login from './auth/Login'
import Register from './auth/Register'

import EntriesContainer from './entries/EntriesContainer'
import TimerContainer from './timer/TimerContainer'
import EntryDetailsContainer from './entries/EntryDetailsContainer'
import FeedContainer from './feed/FeedContainer'
import HistoryContainer from './history/HistoryContainer'
import { UserProvider } from './providers/UserProvider'
import HomeContainer from './home/HomeContainer'

export class ApplicationViews extends Component {
    render() {
        return (

            <React.Fragment>
                
                {/* <Route path="/home" render={(props) => {
                    return <>
                            <TimerContainer {...props} />
                            <EntriesContainer {...props} />
                        </>
                }} /> */}
                {/* TODO: refactor this after MVP so non-registered user can still use timer/todo */}
                <AuthRoute path="/home" Destination={HomeContainer} />

                <Route exact path="/entries/:entryId(\d+)/details" render={(props)=>{
                    return <EntryDetailsContainer {...props} />
                }} />
                {/* <AuthRoute path="/entries/:entryId(\d+)/details" Destination={EntryDetailsContainer} /> */}

                <Route path="/feed" render={(props)=>{
                    return <FeedContainer {...props} />
                }} />
                {/* <AuthRoute path="/feed" Destination={FeedContainer} /> */}
                

                <Route path="/history" render={(props)=>{
                    return <HistoryContainer {...props} />
                }} />
                {/* <AuthRoute path="/history" Destination={HistoryContainer} /> */}
                
                <UserProvider>
                    <Route path="/register" component={Register} />
                </UserProvider>

                <Route path="/login" component={Login} />

            </React.Fragment>
        )
    }
}

export default ApplicationViews
