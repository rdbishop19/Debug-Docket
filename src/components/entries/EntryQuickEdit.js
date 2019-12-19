import React, { useState } from 'react';
import { Card, CardHeader, Tooltip, IconButton, InputLabel, Input, CardContent, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import SaveIcon from '@material-ui/icons/Save';

export default function EntryQuickEdit(props) {
	const { cancelEdit, deleteItem, updateItem, item, history, match } = props;

	const [ editedItem, setEditedItem ] = useState({
		title: item.title,
		description: item.description
	});

	const handleKeyPress = (e) => {
		const key = e.which || e.keyCode;
		const newTitle = e.target.value;
		// User pressed ENTER
		if (key === 13) {
			handleChange(e);
			if (newTitle !== '') {
				updateItem(editedItem, item.id);
			} else {
				window.alert('Title cannot be blank');
			}
		}
		else handleChange(e)
	};

	const handleChange = (e) => {
		setEditedItem({
			...editedItem, [e.target.id]: e.target.value
		});
	};

	const handleSave = () => {
		updateItem(editedItem, item.id);
	};

	return (
		<Card style={{ backgroundColor: "beige"}}>
			<CardHeader
				// avatar={

				// }
				action={
					<Tooltip title="Close" aria-label="close">
						<IconButton aria-label="close" size="small" onClick={cancelEdit}>
							<CloseIcon />
						</IconButton>
					</Tooltip>
				}
				title={
					<React.Fragment>
						{/* <InputLabel htmlFor="title">Title:</InputLabel> */}
						<TextField
							id="title"
							label="Title"
							type="text"
							style={{ width: '95%', backgroundColor: "white" }}
							defaultValue={item.title}
							onKeyPress={handleKeyPress}
							autoFocus={true}
							onChange={handleChange}
							required
                            variant="outlined"
						/>
					</React.Fragment>
				}
				subheader={'Quick Edit'}
			/>
			<CardContent>
				{/* <InputLabel htmlFor="description">Description:</InputLabel> */}
				<TextField
					id="description"
					type="text"
					style={{ width: '95%', backgroundColor: "white" }}
					label="Description"
					defaultValue={item.description}
					onKeyPress={handleKeyPress}
					multiline
					rows="3"
					onChange={handleChange}
					variant="outlined"
				/>
				<br /><br/>
				<Tooltip title="Edit" aria-label="edit">
					<IconButton
						style={{ margin: '0 15px' }}
						aria-label="edit"
						size="small"
						onClick={() => history.push(`${match.path}/${item.id}/edit`)}
					>
						<CreateIcon />
					</IconButton>
				</Tooltip>
				<Tooltip title="Save" aria-label="save">
					<IconButton
						color="primary"
						style={{ margin: '0 15px' }}
						aria-label="save"
						size="small"
						onClick={handleSave}
					>
						<SaveIcon />
					</IconButton>
				</Tooltip>
				<Tooltip title="Delete" aria-label="delete">
					<IconButton
						aria-label="delete"
						style={{ margin: '0 15px' }}
						size="small"
						onClick={() => deleteItem(item.id)}
					>
						<DeleteIcon />
					</IconButton>
				</Tooltip>
			</CardContent>
		</Card>
	);
}
