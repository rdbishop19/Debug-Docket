import React, { useRef, useContext } from 'react'
import { withRouter } from 'react-router-dom'
import { UserContext } from '../providers/UserProvider'
import Settings from '../../repositories/Settings'

const Register = props => {
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const password = useRef()
    const verifyPassword = useRef()

    // useContext from UserProvider
    const { createAccount } = useContext(UserContext)

    const handleRegister = e => {
        e.preventDefault()

        const newUser = {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            email: email.current.value,
            password: password.current.value,
        }

        createAccount(newUser).then((user) => {
            console.log('newUser response', user)
            props.history.push({
                pathname: "/home"
            })
        })
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Create New Account</h1>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input ref={firstName} type="text"
                        name="firstName"
                        placeholder="First name"
                        autocomplete="given-name"
                        required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input ref={lastName} type="text"
                        name="lastName"
                        placeholder="Last name"
                        autocomplete="family-name"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> Email address </label>
                    <input ref={email} type="email"
                        name="email"
                        placeholder="Email address"
                        autocomplete="email"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword"> Password </label>
                    <input ref={password} type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword"> Verify Password </label>
                    <input ref={verifyPassword} type="password"
                        name="verifyPassword"
                        placeholder="Verify password"
                        autoComplete="new-password"
                        required />
                </fieldset>
                <fieldset>
                    <button type="submit">
                        Sign in
                    </button>
                </fieldset>
            </form>
        </main>
    )
}

export default withRouter(Register)
