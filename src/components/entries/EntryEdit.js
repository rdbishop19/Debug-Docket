import React, { useState, useEffect, useContext } from 'react';
import {
	Paper,
	Typography,
	FormControl,
	InputLabel,
	Input,
	RadioGroup,
	Radio,
	FormControlLabel,
	FormLabel,
	Button,
	MenuItem,
	FormHelperText,
	Select,
	Tooltip,
	IconButton,
	TextField
} from '@material-ui/core';
import Settings from '../../repositories/Settings';
import { EntryContext } from '../providers/EntryProvider';
import Dropdowns from '../inputform/Dropdowns';
import DeleteIcon from '@material-ui/icons/Delete';

export default function EntryEdit(props) {
	const initialEntry = {
		title: '...loading',
		description: '...loading',
		id: '',
		isCompleted: false,
		priority: {
			id: '0',
			label: 'n/a'
		},
		severity: {
			id: '0',
			label: 'n/a'
		},
		category: {
			id: '0',
			label: 'none'
		}
	};
	const [ entry, setEntry ] = useState(initialEntry);

	// useContext from UserProvider
	const { getEntry, updateEntry, deleteEntry } = useContext(EntryContext);

	const handleFieldChange = (e) => {
		setEntry({ ...entry, [e.target.name]: e.target.value });
	};

	const handleIsCompletedChange = (e) => {
		const isCompleted = e.target.value === 'true' ? true : false;
		setEntry({ ...entry, isCompleted: isCompleted });
	};
	//TODO: need to refactor this. Hacky and implicit
	const handleRadioChange = (e) => {
		setEntry({ ...entry, [e.target.name]: { id: Number(e.target.value) } });
	};

	const handleDelete = () => {
		if (window.confirm('Delete this entry?')) {
			// console.log('delete')
			deleteEntry(id).then(() => {
				props.history.push('/home');
			});
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const { title, description, id, isCompleted, priority, severity, category } = entry;
		// console.log('entry', entry)
		const timeCompleted = isCompleted ? new Date().toISOString() : '';
		const newEntry = {
			title: title,
			description: description,
			id: id,
			isCompleted: isCompleted,
			timeCompleted: timeCompleted,
			priorityId: priority.id,
			severityId: severity.id,
			categoryId: category.id
		};
		updateEntry(newEntry).then((result) => {
			// console.log('result', result)
			//TODO: style/add MaterialUI Snackbar popup here after successful update to notify user
			props.history.push('/home');
		});
	};

	useEffect(
		() => {
			// console.log('initial useEffect ran')
			getEntry(props.match.params.entryId).then(setEntry);
			// eslint-disable-next-line react-hooks/exhaustive-deps
		},
		[ props.match.params.entryId ]
	);

	const { id, title, description, priority, severity, category, isCompleted } = entry;

	return (
		<div style={{ flex: 1, minWidth: "375px" }}>
			<h3>TICKET</h3>
			<Paper style={{ width: '97%', margin: '0 10px' }}>
				<Typography component="div">
					<form style={{ width: '97%', textAlign: 'left', padding: '15px' }} onSubmit={handleSubmit}>
						<FormControl component="fieldset" style={{ width: '90%', padding: '15px' }}>
							<InputLabel>Title:</InputLabel>
							<Input value={title} name="title" onChange={handleFieldChange} />
						</FormControl>
						<br />
						<FormControl style={{ width: '90%', padding: '15px' }}>
							<TextField
								value={description}
								label="Description:"
								variant="outlined"
								name="description"
								multiline
								rows="3"
								onChange={handleFieldChange}
							/>
						</FormControl>
						<br />
						<div style={{ width: '100%', textAlign: 'center' }}>

						<FormControl style={{ width: '90%', margin: "0 auto" }}>
							<FormLabel>Status:</FormLabel>
							<RadioGroup style={{ paddingLeft: "200px"}}
								row
								value={isCompleted}
								aria-label="status"
								name="isCompleted"
								onChange={handleIsCompletedChange}
							>
								<FormControlLabel value={false} control={<Radio color="default" />} label="Open" />
								<FormControlLabel value={true} control={<Radio color="default" />} label="Closed" />
							</RadioGroup>
						</FormControl>
						<br />

						<Dropdowns
							priority={priority}
							severity={severity}
							category={category}
							handleRadioChange={handleRadioChange}
						/>

						<br />
						<br />
							<Button type="submit" color="primary" variant="contained">
								Save
							</Button>
							<Button
								type="button"
								color="default"
								variant="outlined"
								onClick={() => props.history.push('/home')}
							>
								Cancel
							</Button>
							<Tooltip title="Delete" aria-label="delete">
								<IconButton aria-label="delete" size="small" onClick={handleDelete}>
									<DeleteIcon />
								</IconButton>
							</Tooltip>
						</div>
					</form>
				</Typography>
			</Paper>
		</div>
	);
}
