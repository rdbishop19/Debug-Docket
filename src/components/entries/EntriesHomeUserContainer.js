import React, { useState, useContext, useEffect } from 'react';
import EntryCard from './EntryCard';
import EntryInputNew from './EntryInputNew';
import { EntryContext } from '../providers/EntryProvider';
import { UserContext } from '../providers/UserProvider';

export default function EntriesHomeContainer(props) {

    const [bugArray, setBugArray] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [editingId, setEditingId] = useState()

    const { userEntries, createEntry } = useContext(EntryContext)
    const { getLoggedInUser } = useContext(UserContext)
    const activeUser = getLoggedInUser()

    const addNew = (todo) => {
        // let newArray = [{ id: bugArray.length, todo: todo }, ...bugArray ]
        const newEntry = {
            userId: activeUser.id,
            title: todo,
            description: '',
            timeStarted: new Date().toISOString(),
            timeCompleted: '',
            isCompleted: false,
            severityId: 0,
            priorityId: 0,
            categoryId: 0,
            totalWorkTime: 0,
            totalBreakTime: 0,
        }
        console.log('new entry', newEntry)
        createEntry(newEntry)
        // setBugArray(newArray)
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

    useEffect(()=>{
        console.log('userentries', userEntries)
    }, [userEntries])
    
    return (
        <div style={{ flex: 1 }}>
            <h3>DOCK IT</h3>
            <h4>Current Bugs</h4>
            <EntryInputNew addNew={addNew} />
            <br />
            {userEntries.map((item) => {
                return <EntryCard key={item.id}
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