import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import AuthRoute from './auth/AuthRoute'
import Login from './auth/Login'
import Register from './auth/Register'

//TODO: uncomment and use these possibly after MVP met and working on TIMER
import EntriesHomeContainer from './entries/EntriesHomeContainer'
import TimerContainer from './timer/TimerContainer'
import EntryDetailsContainer from './entries/EntryDetailsContainer'
import FeedContainer from './feed/FeedContainer'
import HistoryContainer from './history/HistoryContainer'
import { UserProvider } from './providers/UserProvider'
import HomeContainer from './home/HomeContainer'
import { EntryProvider } from './providers/EntryProvider'
import { FriendProvider } from './providers/FriendProvider';
import EditProfile from './profile/EditProfile'
export class ApplicationViews extends Component {
    render() {
        return (

            <React.Fragment>
                
                <Route exact path="/" render={(props) => {
                    return <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center", height: "85vh", textAlign: "center"}}>
                            <TimerContainer {...props} />
                            <EntriesHomeContainer {...props} />
                        </div>
                }} />
                {/* TODO: refactor this after MVP so non-registered user can still use timer/todo */}
                <UserProvider>
                    <EntryProvider>
                        <AuthRoute path="/home" Destination={HomeContainer} />
                    </EntryProvider>
                </UserProvider>


                {/* <Route exact path="/entries/:entryId(\d+)/details" render={(props)=>{
                    return <EntryDetailsContainer {...props} />
                }} /> */}

                {/* <Route path="/feed" render={(props)=>{
                    return <FeedContainer {...props} />
                }} /> */}
                

                {/* <Route path="/history" render={(props)=>{
                    return <HistoryContainer {...props} />
                }} /> */}
                {/* <UserProvider>
                    <EntryProvider>
                    </EntryProvider>
                </UserProvider> */}
                
                <UserProvider>
                    <FriendProvider>
                        <EntryProvider>
                            <AuthRoute path="/feed" Destination={FeedContainer} />
                            <AuthRoute path="/history" Destination={HistoryContainer} />
                            <AuthRoute exact path="/entries/:entryId(\d+)/details" Destination={EntryDetailsContainer} />
                            <Route path="/register" component={Register} />
                            <Route path="/login" component={Login} />
                        </EntryProvider>
                    </FriendProvider>
                    <AuthRoute path="/profile/edit" Destination={EditProfile} />
                </UserProvider>


            </React.Fragment>
        )
    }
}

export default ApplicationViews
