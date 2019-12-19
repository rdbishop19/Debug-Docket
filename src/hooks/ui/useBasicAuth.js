import { useState } from 'react'

const useBasicAuth = () => {

    // hooks useState setup
    const [loggedIn, setIsLoggedIn] = useState(false)

    // similar to function we used in functional components previously
    const isAuthenticated = () =>
        loggedIn
        || localStorage.getItem("credentials") !== null
        || sessionStorage.getItem("credentials") !== null

    // accept validated user inputs and set local/session Storage based
    // on user 'remember be' settings
    const login = (userObj, email, password, storageType = localStorage) => {
        storageType.setItem(
            "credentials",
            JSON.stringify({
                id: userObj.id,
                email: email,
                password: password,
                firstName: userObj.firstName,
                lastName: userObj.lastName,
                avatarUrl: userObj.avatarUrl ? userObj.avatarUrl : "",
            })
        )
        // change state to logged in
        setIsLoggedIn(true)
    }

    // log out user by changing state and removing local/session storage
    const logout = () => {
        setIsLoggedIn(false)
        localStorage.removeItem("credentials")
        sessionStorage.removeItem("credentials")
    }

    // return an object with these functions so they can be used elsewhere
    return { isAuthenticated, logout, login}
        
}

export default useBasicAuth