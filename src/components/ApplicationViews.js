import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import AuthRoute from './auth/AuthRoute'
import Login from './auth/Login'
import Register from './auth/Register'

import EntriesHomeContainer from './entries/EntriesHomeContainer'
import TimerContainer from './timer/TimerContainer'
import EntryDetailsContainer from './entries/EntryDetailsContainer'
import FeedContainer from './feed/FeedContainer'
import HistoryContainer from './history/HistoryContainer'
import { UserProvider } from './providers/UserProvider'
import HomeContainer from './home/HomeContainer'
import { EntryProvider } from './providers/EntryProvider'
import { FriendProvider } from './providers/FriendProvider';
export class ApplicationViews extends Component {
    render() {
        return (

            <React.Fragment>
                
                {/* <Route path="/home" render={(props) => {
                    return <>
                            <TimerContainer {...props} />
                            <EntriesHomeContainer {...props} />
                        </>
                }} /> */}
                {/* TODO: refactor this after MVP so non-registered user can still use timer/todo */}
                <EntryProvider>
                    <AuthRoute path="/home" Destination={HomeContainer} />
                </EntryProvider>


                <Route exact path="/entries/:entryId(\d+)/details" render={(props)=>{
                    return <EntryDetailsContainer {...props} />
                }} />
                {/* <AuthRoute path="/entries/:entryId(\d+)/details" Destination={EntryDetailsContainer} /> */}

                {/* <Route path="/feed" render={(props)=>{
                    return <FeedContainer {...props} />
                }} /> */}
                

                {/* <Route path="/history" render={(props)=>{
                    return <HistoryContainer {...props} />
                }} /> */}
                <UserProvider>
                    <EntryProvider>
                        <AuthRoute path="/history" Destination={HistoryContainer} />
                    </EntryProvider>
                </UserProvider>
                
                <UserProvider>
                    <FriendProvider>
                        <EntryProvider>
                            <AuthRoute path="/feed" Destination={FeedContainer} />
                        </EntryProvider>
                    </FriendProvider>
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                </UserProvider>


            </React.Fragment>
        )
    }
}

export default ApplicationViews
