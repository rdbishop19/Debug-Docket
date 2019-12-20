import React, { useState } from 'react';
import EntryCardNonAuth from './EntryCardNonAuth';
import EntryInputNew from './EntryInputNew';
import { Typography } from '@material-ui/core';

export default function EntriesHomeContainer(props) {
    const [bugArray, setBugArray] = useState([
        {
            id: 0,
            todo: "Register for Debug Docket"
        },
        {
            id: 1,
            todo: "Take more breaks"
        },
        {
            id: 2,
            todo: "Look up the word 'Pomodoro'"
        }
    ])
    const [isEditing, setIsEditing] = useState(false)
    const [editingId, setEditingId] = useState()
    
    const addNew = (todo) => {
        let newArray = [{ id: bugArray.length, todo: todo }, ...bugArray ]
        setBugArray(newArray)
    };

    const edit = (id) => {
        // console.log('editing parent state' )
        setIsEditing(!isEditing)
        setEditingId(id)
    };
    const cancelEdit = () => {
        setIsEditing(false)
    }

	const updateItem = (todo, index) => {
        let newArray = bugArray
        // handles the reverse array logic of the main display
        newArray[bugArray.length - index - 1] = { id: index, todo: todo }; //new value
        setBugArray(newArray)
        setIsEditing(false)
        setEditingId()
    };
    
    return (
        <div style={{ flex: 1 }}>
            <h3>DOCK IT</h3>
            <EntryInputNew addNew={addNew} />
            <br />
            <h3>TO-DO LIST</h3>
            <Typography variant="caption">Register/Sign in to start your bug tracking journey</Typography>
            {bugArray.map((item) => {
                return <EntryCardNonAuth key={item.id}
                                item={item}
                                isEditing={isEditing}
                                editingId={editingId} 
                                edit={edit} 
                                updateItem={updateItem}
                                cancelEdit={cancelEdit} />;
            })}
        </div>
    );
}