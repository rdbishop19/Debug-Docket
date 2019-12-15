import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { Input, InputLabel, Button, IconButton, Tooltip } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import SaveIcon from '@material-ui/icons/Save';

export default function EntryCard(props) {
    const { item, isEditing, edit, editingId, cancelEdit, updateItem, match, history } = props;
    const [editedItem, setEditedItem] = useState(item.title)

	const listStyle = {
		backgroundColor: '#4ecca3',
		padding: '5px',
		margin: '5px',
		border: '0.5px solid black',
		borderRadius: '5px',
		cursor: 'pointer'
	};

    const editInput = useRef();

	const handleKeyPress = (e) => {
        const key = e.which || e.keyCode;
        const newTitle = e.target.value
        // User pressed ENTER
		if (key === 13) {
            if (newTitle !== ""){
                updateItem(e.target.value, item.id);
            } else {
                window.alert("Title cannot be blank")
            }
        }
    };

    const handleChange = (e) => {    
        setEditedItem(e.target.value);
    }

    const handleSave = () => {
        // console.log('editedItem', editedItem)
        updateItem(editedItem, item.id)
    }

	const initEditor = () => {
		editInput.current = (
            <div >
                <InputLabel htmlFor="title">Title:</InputLabel>
                <Input id="title" type="text" 
                        defaultValue={item.title} 
                        onKeyPress={handleKeyPress} 
                        autoFocus={true}
                        onChange={handleChange}
                        />
                <br />
                <Tooltip title="Save" aria-label="save">
                    <IconButton aria-label="save" size="small" onClick={handleSave}>
                        <SaveIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Edit" aria-label="edit">
                    <IconButton aria-label="edit" size="small" onClick={()=> history.push(`${match.path}/${item.id}/edit`)}>
                        <CreateIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Close" aria-label="close">
                    <IconButton aria-label="close" size="small" onClick={cancelEdit}>
                        <CloseIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete" aria-label="delete">
                    <IconButton aria-label="delete" size="small">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </div>
		);
	};

	const handleClick = (e) => {
		edit(item.id);
	};

	useEffect(() => {
		initEditor();
	});

	return (
		<div onClick={handleClick} style={listStyle}>
			{isEditing && editingId === item.id ? (
				<React.Fragment>
					{/* <span>Original Title: {item.title}</span> */}
					<div>{editInput.current}</div>
				</React.Fragment>
			) : (
				<React.Fragment>
					<span>{item.title}</span>
					{/* <FontAwesomeIcon style={{ position: 'absolute', right: '10px' }} icon={faCheckSquare} /> */}
				</React.Fragment>
			)}
		</div>
	);
}
