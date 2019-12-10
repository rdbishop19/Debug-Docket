import React, { useRef, useState } from 'react'
import { withRouter } from 'react-router-dom'
import useBasicAuth from '../../hooks/ui/useBasicAuth'

import { FormControl, InputLabel, Input, Button, Checkbox, FormControlLabel, Paper, Typography, Link } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import { Link as RouterLink } from 'react-router-dom';
/* 
    Purpose: Render the login screen and set user in storage
    Author: Ryan Bishop
*/

const register = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

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
                <br />
                    <form onSubmit={handleLogin} autoComplete="off" style={{ width: "200px", margin: "0 auto"}}>
                        <FormControl >
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input inputRef={email}
                                    id="email"
                                    type="email"
                                    autoComplete="email" 
                                    required autoFocus
                                    />
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input inputRef={password} 
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
                                        // inputRef={remember}
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
                    <Link component={register} to="/register">
                        New user? Create account
                    </Link>
                </Typography>
            </Paper>

        </React.Fragment>
    )
}

export default withRouter(Login)
