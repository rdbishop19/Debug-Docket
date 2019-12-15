import React, { useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons'

export default function EntryCard(props) {
    const { item, isEditing, edit, editingId, cancelEdit, updateItem } = props
    const listStyle = {
        backgroundColor: "#4ecca3",
        padding: "5px",
        margin: "5px",
        border: "0.5px solid black",
        borderRadius: "5px",
        cursor: "pointer",
    }

    const editInput = useRef()

    const initEditor = () => {
        editInput.current = <input type="text" defaultValue={item.title} onKeyPress={(e) => {
            const key = e.which || e.keyCode;
            if (key === 13) { // User pressed ENTER
                updateItem(e.target.value, item.id)
            }
        }} autoFocus={true} 
            onBlur={cancelEdit}
            />;
    }

    const handleClick = e =>{
        edit(item.id)
    }

    useEffect(() => {
        initEditor()
    })

    return (
        <div onClick={handleClick} style={listStyle}>
            {isEditing && editingId === item.id ? 
                <>
                    <p>Editing View</p>
                    {editInput.current}
                </>
                :
                <>
                    <span>{item.title}</span>
                    <FontAwesomeIcon style={{ position: "absolute", right: "10px" }} icon={faCheckSquare} />
                </>
            }
        </div>
    )
}