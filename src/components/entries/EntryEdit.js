import React, { useState, useEffect, useContext } from 'react'
import { Paper, Typography, FormControl, InputLabel, Input, RadioGroup, Radio, FormControlLabel, FormLabel, Button, MenuItem, FormHelperText, Select } from '@material-ui/core'
import Settings from '../../repositories/Settings'
import { EntryContext } from '../providers/EntryProvider'

export default function EntryEdit(props) {
    
    const initialEntry = {
        title: '',
        description: '',
        id: '',
        isCompleted: false,
        priority: {
            id: '',
            label: ''
        },
        severity: {
            id: '',
            label: ''
        },
        category: {
            id: '',
            label: ''
        }
    }
    // useContext from UserProvider
    const { getEntry, updateEntry } = useContext(EntryContext)

    const [entry, setEntry] = useState(initialEntry)
    
    const [priorities, setPriorities] = useState([])
    const [severities, setSeverities] = useState([])
    const [categories, setCategories] = useState([])

    const handleFieldChange = e => {
        setEntry({...entry, [e.target.name]: e.target.value})
    }

    const handleIsCompletedChange = e => {
        const isCompleted = e.target.value === "true" ? true : false
        setEntry({...entry, isCompleted: isCompleted})
    }
    //TODO: need to refactor this. Hacky and implicit
    const handleRadioChange = e => {
        setEntry({...entry, [e.target.name]: { id: Number(e.target.value) }})
    }

    const handleSubmit = e => {
        e.preventDefault()
        const { title, description, id, isCompleted, priority, severity, category } = entry
        // console.log('entry', entry)
        const timeCompleted = isCompleted ? new Date().toISOString() : ''
        const newEntry = {
            title: title,
            description: description,
            id: id,
            isCompleted: isCompleted,
            timeCompleted: timeCompleted,
            priorityId: priority.id,
            severityId: severity.id,
            categoryId: category.id, 
        }
        updateEntry(newEntry)
        .then((result)=>{
            // console.log('result', result)
            //TODO: style/add MaterialUI Snackbar popup here after successful update to notify user
        })
    }


    useEffect(()=>{
        // console.log('initial useEffect ran')
        getEntry(props.match.params.entryId)
        .then(setEntry)
        //TODO: move to separate component
        fetch(`${Settings.remoteURL}/priorities`)
        .then((data)=>data.json())
        .then(setPriorities)
    
        //TODO: move to separate component
        fetch(`${Settings.remoteURL}/severities`)
        .then((data)=>data.json())
        .then(setSeverities)
        //TODO: move to separate component
        fetch(`${Settings.remoteURL}/categories`)
        .then((data)=>data.json())
        .then(setCategories)
        //TODO: move to separate component
        fetch(`${Settings.remoteURL}/categories`)
        .then((data)=>data.json())
        .then(setCategories)
    }, [])

    const { title, description, priority, severity, category, isCompleted } = entry

    return (
        <Paper>
            <form style={{ width: "50%", textAlign: "center", margin: "0 auto"}} onSubmit={handleSubmit}>
                <Typography>Bug Ticket</Typography>
                <FormControl component="fieldset">
                    <InputLabel>Title:</InputLabel>
                    <Input value={title} name="title" onChange={handleFieldChange}></Input>
                </FormControl>
                <br/>
                <FormControl>
                    <InputLabel>Description:</InputLabel>
                    <Input value={description} name="description" onChange={handleFieldChange}></Input>
                </FormControl>
                <br/>
                <FormControl>
                <InputLabel id="demo-simple-select-helper-label">Priority</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={priority.id}
                        name="priority"
                        onChange={handleRadioChange}
                        
                        >
                        {priorities.map((priority)=>{
                            return <MenuItem key={priority.id} value={priority.id}>{priority.label}</MenuItem>
                        })}
                    </Select>
                    {/* <FormHelperText>Some important helper text</FormHelperText> */}
                </FormControl>
                {/* <FormControl>
                    <FormLabel>Priority:</FormLabel>
                    <RadioGroup value={priority.id} aria-label="priority" name="priority" onChange={handleRadioChange}>
                        {priorities.map((priority)=>{
                            return <FormControlLabel key={priority.id} value={priority.id} label={priority.label} control={
                                <Radio color="default" />} />
                        })}
                    </RadioGroup>
                </FormControl> */}
                {/* <br/> */}
                <FormControl>
                    <FormLabel>Severity:</FormLabel>
                    <RadioGroup value={severity.id} aria-label="severity" name="severity" onChange={handleRadioChange}>
                        {severities.map((severity)=>{
                            return <FormControlLabel key={severity.id} value={severity.id} label={severity.label} control={
                                <Radio color="default" />} />
                        })}
                    </RadioGroup>
                </FormControl>
                <br/>
                <FormControl>
                    <FormLabel>Category:</FormLabel>
                    <RadioGroup value={category.id} aria-label="category" name="category" onChange={handleRadioChange}>
                        {categories.map((category)=>{
                            return <FormControlLabel key={category.id} value={category.id} label={category.label} control={
                                <Radio color="default" />} />
                        })}
                    </RadioGroup>
                </FormControl>
                {/* <br/> */}
                <FormControl>
                    <FormLabel>Status:</FormLabel>
                    <RadioGroup value={isCompleted} aria-label="status" name="isCompleted" onChange={handleIsCompletedChange}>
                        <FormControlLabel value={false} control={
                        <Radio color="default" />} label="Open" />
                        <FormControlLabel value={true} control={
                        <Radio color="default" />} label="Closed"/>
                    </RadioGroup>
                </FormControl>
                <Button type="submit" color="primary" variant="outlined">Save</Button>
                <Button type="button" color="default" variant="outlined" onClick={()=>props.history.push("/home")}>Cancel</Button>
            </form>
        </Paper>
    )
}

