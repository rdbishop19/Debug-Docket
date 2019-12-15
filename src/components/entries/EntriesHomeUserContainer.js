import React, { useState, useContext, useEffect } from 'react';
import EntryCard from './EntryCard';
import EntryInputNew from './EntryInputNew';
import { EntryContext } from '../providers/EntryProvider';
import { UserContext } from '../providers/UserProvider';

export default function EntriesHomeContainer(props) {

    const [isEditing, setIsEditing] = useState(false)
    const [editingId, setEditingId] = useState()

    const { entries, userEntries, createEntry, updateEntry, getUserEntries } = useContext(EntryContext)
    const { getLoggedInUser } = useContext(UserContext)
    const activeUser = getLoggedInUser()

    const addNew = (todo) => {
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
        createEntry(newEntry).then(()=> getUserEntries(activeUser.id))
    };

    const edit = (id) => {
        setIsEditing(!isEditing)
        setEditingId(id)
    };
    const cancelEdit = () => {
        setIsEditing(false)
    }

	const updateItem = (todo, index) => {
        const entryEdit = {
            id: index,
            title: todo,
        }
        updateEntry(entryEdit).then(getUserEntries)
        setIsEditing(false)
        setEditingId()
    };

    useEffect(()=>{
        
    }, [entries, userEntries])
    
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