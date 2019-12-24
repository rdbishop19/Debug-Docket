import React, { useState } from 'react'
import { Input, TextField, useTheme } from '@material-ui/core'

export default function EntryInputNew(props) {

    const [todo, setTodo] = useState('')
    const initialHelper = 'Click it and ticket!'
    const [helperText, setHelperText] = useState(initialHelper)

    const handleFieldChange = e => {
        if (e.target.value !== ""){
            setHelperText('Press [Enter] to add item to list')
        } else setHelperText(initialHelper)
        setTodo(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        props.addNew(todo)
        e.target.reset()
        setHelperText(initialHelper)
    }

    const theme = useTheme()
	const { palette: { type/* , primary, secondary, error */ }} = theme

    return (
        <form onSubmit={handleSubmit}>
            {/* <Input type="text" name="todo" placeholder="Add new bug" onChange={handleFieldChange} required/> */}
            <TextField
                id="new-todo"
                name="todo"
                label="To-Do item"
                InputProps={{ color: type === "light" ? "primary" : "secondary"}}
                style={{ margin: 8, width: "95%" }}
                placeholder={`What's on the docket today?`}
                helperText={helperText}
                margin="none"
                InputLabelProps={{
                    shrink: true,
                    color: type === "light" ? 'primary' : 'secondary'
                }}
                onChange={handleFieldChange}
                variant="outlined"
                required
            />
 
        </form>
    )
}
