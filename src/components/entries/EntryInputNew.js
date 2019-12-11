import React, { useState } from 'react'

export default function EntryInputNew(props) {

    const [todo, setTodo] = useState('')

    const handleFieldChange = e => {
        setTodo(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        props.addNew(todo)
        e.target.reset()
    }

    return (
        <form onSubmit={handleSubmit}>
            <input name="todo" placeholder="Add new bug" onChange={handleFieldChange} required/>
        </form>
    )
}
