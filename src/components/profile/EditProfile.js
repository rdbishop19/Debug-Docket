import React, { useContext, useState, useEffect } from 'react';
import { Paper, Typography, Button, TextField, Input, InputLabel, Avatar, makeStyles } from '@material-ui/core';
import { UserContext } from '../providers/UserProvider';
import useBasicAuth from '../../hooks/ui/useBasicAuth';

const useStyles = makeStyles(theme => ({
	root: {
	  display: 'flex',
	  '& > *': {
		margin: theme.spacing(1),
	  },
	},
	small: {
	  width: theme.spacing(3),
	  height: theme.spacing(3),
	},
	large: {
	  width: theme.spacing(7),
      height: theme.spacing(7),
      margin: "0 auto"
	},
  }));

export default function EditProfile(props) {
    const classes = useStyles();
	const { getLoggedInUser, users, updateUserProfile, setLoggedInUser } = useContext(UserContext);
    const activeUser = getLoggedInUser();
    const [avatarUrl, setAvatarUrl] = useState("")
    const [selectedFile, setSelectedFile] = useState("")
	const { email: currentEmail, password: currentPassword } = activeUser;
	const [ currentUser, setCurrentUser ] = useState({
		email: '',
		password: '',
		verifyPassword: '',
		firstName: '',
		lastName: ''
	});

	const { login } = useBasicAuth();

	// const [newEmail, setNewEmail] = useState('')
	// const [newPassword, setNewPassword] = useState('')
	// const [newFirstName, setNewFirstName] = useState('')
	// const [newLastName, setNewLastName] = useState('')

	//*****************************************************************************************************
	// File Selector Handler
	//*****************************************************************************************************
	const fileSelectorHandler = (event) => {
        setSelectedFile(event.target.files[0])
		// this.setState({
		// 	selectedFile: event.target.files[0]
		// });
	};
	//*****************************************************************************************************
	// File Upload Handler
	//*****************************************************************************************************
	const fileUploadHandler = async (e) => {
		console.log('UPLOAD');
		e.preventDefault();
		const files = selectedFile;
		const data = new FormData();
		data.append('file', files);
		data.append('upload_preset', 'Debug-Docket');
		const res = await fetch('https://api.cloudinary.com/v1_1/deibmlxrf/image/upload', {
			method: 'POST',
			body: data
		});
        const file = await res.json();
        window.alert("Profile picture updated!")
        setAvatarUrl(file.secure_url)
    };
    
	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const handleChange = (e) => {
		setCurrentUser({
			...currentUser,
			[e.target.name]: e.target.value
		});
	};

	const updateProfile = () => {
		const updatedUser = {
			id: activeUser.id,
			email: currentUser.email,
			firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            avatarUrl: avatarUrl
		};
		updateUserProfile(updatedUser).then((user) => {
			localStorage.removeItem('credentials');
			sessionStorage.removeItem('credentials');
			login(user.id, user.email, user.password);
			setLoggedInUser(null);
			setLoggedInUser(user.id);
			if (window.confirm('Profile updated. Go back to main page?')) {
				props.history.push('/home');
			}
		});
	};

	useEffect(
		() => {
			const foundUser = users.filter((user) => {
				return user.email === currentEmail && user.password === currentPassword;
			});
			const newUser = foundUser[0];
			if (newUser) {
                setCurrentUser(foundUser[0]);
                setAvatarUrl(foundUser[0].avatarUrl)
			}
		},
		[ users, currentEmail, currentPassword ]
	);

	const { firstName, lastName, email /* password, verifyPassword */ } = currentUser;

	return (
		<Paper style={{ textAlign: 'center' }}>
			<Typography variant="h5">EDIT USER PROFILE</Typography>
			<form onSubmit={handleSubmit}>
				<br />
				<TextField label="First name" name="firstName" value={firstName} onChange={handleChange} />
				<br />
				<br />
				<TextField label="Last name" name="lastName" value={lastName} onChange={handleChange} />
				<br />
				<br />
				<TextField label="Email" type="email" name="email" value={email} onChange={handleChange} />
				<br />
				<br />
				{/* <InputLabel>Password:</InputLabel>
                <Input name="password" type="password" value={password} onChange={handleChange}/>
                <InputLabel>Verify Password:</InputLabel>
                <Input name="verifyPassword" type="password" value={verifyPassword} onChange={handleChange}/> */}
                <Typography>Current Profile Picture: </Typography>
                <Avatar src={avatarUrl} className={classes.large}/>
				<Input label="Choose New File" accept="image/*" id="contained-button-file" type="file" onChange={fileSelectorHandler} />
				<InputLabel htmlFor="contained-button-file">
				</InputLabel>
					<Button disabled={selectedFile === ""} variant="contained" component="span" onClick={fileUploadHandler}>
						Upload
					</Button>
				<br />
				<br />
				<Button type="submit" color="primary" variant="contained" onClick={updateProfile}>
					Update Profile
				</Button>
			</form>
			<br />
		</Paper>
	);
}
