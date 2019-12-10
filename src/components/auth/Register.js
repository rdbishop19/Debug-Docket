import React, { useRef, useContext } from 'react'
import { withRouter } from 'react-router-dom'
import { UserContext } from '../providers/UserProvider'
import Settings from '../../repositories/Settings'
import { FormControl, InputLabel, Input, Button, Paper, Typography, Link } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { Link as RouterLink } from 'react-router-dom';

const login = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        textAlign: "center",
    },
    formfield: {
        display: "block",
    }
}));

const Register = props => {
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const password = useRef()
    const verifyPassword = useRef()

    // use style classes defined above
    const classes = useStyles();

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

        // post to db and 
        createAccount(newUser).then((user) => {
            console.log('newUser response', user)
            props.history.push({
                pathname: "/home"
            })
        })
    }

    return (
        <React.Fragment>
            <Paper className={classes.root}>
                <Typography variant="h4" component="h3">
                    Register
                </Typography>
                <Typography component="p">
                    Create New Account
                </Typography>
                <Typography component="div">

                </Typography>
                <br />
                <form onSubmit={handleRegister} style={{ width: "250px", margin: "0 auto"}}>
                    <FormControl>
                        <InputLabel htmlFor="firstName"> First Name </InputLabel>
                        <Input inputRef={firstName} type="text"
                            name="firstName"
                            placeholder="First name"
                            autoComplete="given-name"
                            required autoFocus 
                            />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="lastName"> Last Name </InputLabel>
                        <Input inputRef={lastName} type="text"
                            name="lastName"
                            placeholder="Last name"
                            autoComplete="family-name"
                            required 
                            />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="inputEmail"> Email address </InputLabel>
                        <Input inputRef={email} type="email"
                            name="email"
                            placeholder="Email address"
                            autoComplete="email"
                            required 
                            />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="inputPassword"> Password </InputLabel>
                        <Input inputRef={password} type="password"
                            name="password"
                            placeholder="Password"
                            autoComplete="new-password"
                            required
                            />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="verifyPassword"> Verify Password </InputLabel>
                        <Input inputRef={verifyPassword} type="text"
                            name="verifyPassword"
                            placeholder="Verify password"
                            autoComplete="new-password"
                            required 
                            />
                    </FormControl>
                    <FormControl>
                    <FormControl margin="normal">
                        <Button type="submit" variant="contained" color="primary">
                            Sign up
                        </Button>
                    </FormControl>
                    </FormControl>
                </form>
                <Link component={login} to="/login">
                    Already have an account?
                </Link>
            </Paper>
        </React.Fragment>
    )
}

export default withRouter(Register)
