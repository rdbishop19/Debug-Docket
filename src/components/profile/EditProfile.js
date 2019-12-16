import React, { useContext, useState, useEffect } from 'react';
import { Paper, Typography, Button, TextField } from '@material-ui/core';
import { UserContext } from '../providers/UserProvider';
import useBasicAuth from '../../hooks/ui/useBasicAuth';

export default function EditProfile(props) {

    const { getLoggedInUser, users, updateUserProfile } = useContext(UserContext)
    const activeUser = getLoggedInUser()
    const { email: currentEmail, password: currentPassword } = activeUser
    const [currentUser, setCurrentUser] = useState({
        email: '',
        password: '',
        verifyPassword: '',
        firstName: '',
        lastName: '',
    })

    const { login } = useBasicAuth()

    // const [newEmail, setNewEmail] = useState('')
    // const [newPassword, setNewPassword] = useState('')
    // const [newFirstName, setNewFirstName] = useState('')
    // const [newLastName, setNewLastName] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
    }

    const handleChange = e => {
        setCurrentUser({
            ...currentUser,
            [e.target.name]: e.target.value,
        })
    }

    const updateProfile = () => {
        const updatedUser = {
            id: activeUser.id,
            email: currentUser.email,
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
        }
        updateUserProfile(updatedUser).then((user)=>{
            localStorage.removeItem("credentials")
            sessionStorage.removeItem("credentials")
            login(user.id, user.email, user.password)
            if (window.confirm("Profile updated. Go back to main page?")){
                props.history.push("/home")
            }
        })
    }

    useEffect(()=>{
        const foundUser = users.filter((user)=>{
            return user.email === currentEmail && user.password === currentPassword
        })
        const newUser = foundUser[0]
        if (newUser){
            setCurrentUser(foundUser[0])
        }
    }, [users, currentEmail, currentPassword])

    const { firstName, lastName, email, /* password, verifyPassword */ } = currentUser

	return (
		<Paper style={{ textAlign: "center" }}>
			<Typography variant="h5">EDIT USER PROFILE</Typography>
            <form onSubmit={handleSubmit}>
                <br/>
                <TextField label="First name" name="firstName" value={firstName} onChange={handleChange}/><br/><br/>
                <TextField label="Last name" name="lastName" value={lastName} onChange={handleChange}/><br/><br/>
                <TextField label="Email" type="email" name="email" value={email} onChange={handleChange}/><br/><br/>
                {/* <InputLabel>Password:</InputLabel>
                <Input name="password" type="password" value={password} onChange={handleChange}/>
                <InputLabel>Verify Password:</InputLabel>
                <Input name="verifyPassword" type="password" value={verifyPassword} onChange={handleChange}/> */}
                <br/>
                <Button type="submit" color="primary" variant="contained" onClick={updateProfile}>Update Profile</Button>
            </form>
            <br/>
		</Paper>
	);
}
