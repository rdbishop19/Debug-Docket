import React, { useState } from 'react'
import { Input, TextField } from '@material-ui/core'

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
            {/* <Input type="text" name="todo" placeholder="Add new bug" onChange={handleFieldChange} required/> */}
            <TextField
                id="new-todo"
                name="todo"
                label="To-Do item"
                style={{ margin: 8 }}
                placeholder="Get started by adding items to your to-do list"
                helperText="Click it and ticket!"
                style={{ width: "95% "}}
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={handleFieldChange}
                variant="outlined"
                required
            />
 
        </form>
    )
}
