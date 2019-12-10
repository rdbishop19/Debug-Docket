import React, { useRef, useState } from 'react'
import { withRouter } from 'react-router-dom'
import useBasicAuth from '../../hooks/ui/useBasicAuth'

import { FormControl, InputLabel, Input, Button, Checkbox, FormControlLabel, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
/* 
    Purpose: Render the login screen and set user in storage
    Author: Ryan Bishop
*/
const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        textAlign: "center",
    },
    formfield: {
        display: "block",
    }
}));

const Login = props => {
    // setup variables for use in React fn component
    const email = useRef()
    const password = useRef()
    // const remember = useRef(false) // abandoned this in favor of useState
    const classes = useStyles();
    
    const [checked, setChecked] = useState(false)
    // pull 'login' fn from 'useBasicAuth' component
    const { login } = useBasicAuth()
    // console.log('remember?', remember.current.value) // couldn't get this to get right value from MaterialUI component
    // console.log('checked', checked)
    
    const handleLogin = e => {
        e.preventDefault()
        
        // console.log('remember?', remember.current.value)
        // const storage = remember.current.value !== "on" ? localStorage : sessionStorage
        const storage = checked !== true ? localStorage : sessionStorage
        login(email.current.value, password.current.value, storage)
        
        props.history.push({
            pathname: "/home"
        })
    }
    return (

        <React.Fragment>
            <Paper className={classes.root}>
                <Typography variant="h4" component="h3">
                    Welcome Back!
                </Typography>
                <Typography component="p">
                    Please enter your account information.
                </Typography>
                <Typography component="div">
                    <form onSubmit={handleLogin} autoComplete="off">
                        <FormControl margin="normal">
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input ref={email}
                                    id="email"
                                    type="email"
                                    autoComplete="email" 
                                    required autoFocus
                                    />
                        </FormControl>
                        <FormControl margin="normal">
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input ref={password} 
                                    id="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    />
                        </FormControl>
                        <FormControl margin="normal">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                    // had to abandon 'ref' and use state instead
                                        // ref={remember}
                                        id="remember"
                                        value="remember"
                                        checked={checked}
                                        onChange={()=>setChecked(!checked)}
                                        inputProps={{
                                            'aria-label': 'primary checkbox',
                                        }}
                                        />
                                    }
                                    label="Remember me?"
                                    />
                        </FormControl>
                        <FormControl margin="normal">
                            <Button type="submit" variant="contained" color="primary">
                                Sign in
                            </Button>
                        </FormControl>
                    </form>
                </Typography>
            </Paper>

        </React.Fragment>
    )
}

export default withRouter(Login)
