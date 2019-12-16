import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { Input, InputLabel, Button, IconButton, Tooltip, Card, CardContent, CardHeader, Avatar, TextField, Paper, Typography } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import SaveIcon from '@material-ui/icons/Save';

function convertDateTimeFromISO(date) {
    return new Date(date)
}

export default function EntryCard(props) {
    const { item, isEditing, edit, editingId, cancelEdit, updateItem, deleteItem, match, history } = props;
    const [editedItem, setEditedItem] = useState({
        title: item.title,
        description: item.description,
    })

	const listStyle = {
		backgroundColor: '#4ecca3',
		padding: '5px',
        margin: '5px 5px',
		border: '0.2px solid black',
		borderRadius: '5px',
		cursor: 'pointer'
	};

    const editInput = useRef();

	const handleKeyPress = (e) => {
        const key = e.which || e.keyCode;
        const newTitle = e.target.value
        // User pressed ENTER
		if (key === 13) {
            handleChange(e)
            if (newTitle !== ""){
                updateItem(editedItem, item.id);
            } else {
                window.alert("Title cannot be blank")
            }
        }
    };

    const handleChange = (e) => {    
        setEditedItem({
            [e.target.id]: e.target.value
        });
    }

    const handleSave = () => {
        // console.log('editedItem', editedItem)
        updateItem(editedItem, item.id)
    }

	const initEditor = () => {
		editInput.current = (
            <Card>
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
                    title={<React.Fragment>
                            <InputLabel htmlFor="title">Title:</InputLabel> 
                            <Input id="title" type="text" 
                                defaultValue={item.title} 
                                onKeyPress={handleKeyPress} 
                                autoFocus={true}
                                onChange={handleChange}
                                required
                                variant="outlined"
                                />
                            </React.Fragment>
                            }
                    subheader={'Enter in bug info'}
                />
                <CardContent>
                    {/* <InputLabel htmlFor="description">Description:</InputLabel> */}
                    <TextField id="description" type="text" style={{ width: "95%"}}
                            label="Description"
                            defaultValue={item.description} 
                            onKeyPress={handleKeyPress} 
                            multiline
                            rows="3"
                            // autoFocus={true}
                            onChange={handleChange}
                            variant="outlined"
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
                    <Tooltip title="Delete" aria-label="delete">
                        <IconButton aria-label="delete" size="small" onClick={()=> deleteItem(item.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </CardContent>
            </Card>
		);
	};

	const handleClick = (e) => {
		edit(item.id);
	};

	useEffect(() => {
		initEditor();
	});

	return (
		<Card onClick={handleClick} style={listStyle}>
			{isEditing && editingId === item.id ? (
				<React.Fragment>
					{/* <span>Original Title: {item.title}</span> */}
					<div>{editInput.current}</div>
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
