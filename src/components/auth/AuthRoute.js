import React from 'react'
import { Route } from 'react-router-dom'
import Login from './Login'
import useBasicAuth from '../../hooks/ui/useBasicAuth'

/* 
    Purpose: wraps a components in authentication logic and routes accordingly 
    Author: Ryan Bishop
*/

//ES6 destructuring to pull out props immediately for use
const AuthRoute = ({ path, Destination }) => {
    // grab function from imported 'useBasicAuth' component
    const { isAuthenticated } = useBasicAuth()

    return (
        <Route exact path={path} render={props => {
            if (isAuthenticated()) {
                return <Destination {...props} />
            } else {
                return <Login />
            }
        }} />
    )
}

export default AuthRoute

