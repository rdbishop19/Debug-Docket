import React from 'react'
import { Route } from 'react-router-dom'
// import Login from './Login'
import useBasicAuth from '../../hooks/ui/useBasicAuth'
import { withRouter } from 'react-router-dom'
/* 
    Purpose: wraps a components in authentication logic and routes accordingly 
    Author: Ryan Bishop
*/

//ES6 destructuring to pull out props immediately for use
const AuthRoute = ({ path, Destination, history }) => {
    // grab function from imported 'useBasicAuth' component
    const { isAuthenticated } = useBasicAuth()

    return (
        <Route path={path} render={props => {
            if (isAuthenticated()) {
                return <Destination {...props} />
            } else {
                history.push("/login") // URL wasn't changing with <Login /> component
                // return <Login />
            }
        }} />
    )
}

export default withRouter(AuthRoute)

