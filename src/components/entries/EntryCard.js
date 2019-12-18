import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import {
	Input,
	InputLabel,
	Button,
	IconButton,
	Tooltip,
	Card,
	CardContent,
	CardHeader,
	Avatar,
	TextField,
	Paper,
	Typography
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import SaveIcon from '@material-ui/icons/Save';
import EntryQuickEdit from './EntryQuickEdit';

function convertDateTimeFromISO(date) {
	return new Date(date);
}

export default function EntryCard(props) {
	const { item, isEditing, edit, editingId, cancelEdit, updateItem, deleteItem, match, history } = props;
	// const [ editedItem, setEditedItem ] = useState({
	// 	title: item.title,
	// 	description: item.description
	// });

	const listStyle = {
		backgroundColor: '#4ecca3',
		padding: '5px',
		margin: '5px 5px',
		border: '0.2px solid black',
		borderRadius: '5px',
		cursor: 'pointer'
	};

	// const handleKeyPress = (e) => {
	// 	const key = e.which || e.keyCode;
	// 	const newTitle = e.target.value;
	// 	// User pressed ENTER
	// 	if (key === 13) {
	// 		handleChange(e);
	// 		if (newTitle !== '') {
	// 			updateItem(editedItem, item.id);
	// 		} else {
	// 			window.alert('Title cannot be blank');
	// 		}
	// 	}
	// };

	// const handleChange = (e) => {
	// 	setEditedItem({
	// 		[e.target.id]: e.target.value
	// 	});
	// };

	// const handleSave = () => {
	// 	updateItem(editedItem, item.id);
	// };

	const handleClick = (e) => {
		edit(item.id);
	};

	return (
		<Card onClick={handleClick} style={listStyle}>
			{isEditing && editingId === item.id ? (
				<React.Fragment>
					{/* <span>Quick Edit</span> */}
					{/* <div>{editInput.current}</div> */}
                    <EntryQuickEdit cancelEdit={cancelEdit}
                                    deleteItem={deleteItem}
                                    updateItem={updateItem}
                                    item={item}
                                    history={history}
                                    match={match}
                                    />
                    {/* cancelEdit, handleKeyPress, handleChange, deleteItem, item, handleSave, history, match */}
				</React.Fragment>
			) : (
				<Tooltip title="Click to edit" aria-label="click-to-edit">
					<Typography>
						<span>{item.title}</span>
						{/* <FontAwesomeIcon style={{ position: 'absolute', right: '10px' }} icon={faCheckSquare} /> */}
					</Typography>
				</Tooltip>
			)}
		</Card>
	);
}
