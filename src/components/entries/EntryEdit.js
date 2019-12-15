import React, { useState, useEffect, useContext } from 'react'
import { Paper, Typography, FormControl, InputLabel, Input, RadioGroup, Radio, FormControlLabel, FormLabel, Button, MenuItem, FormHelperText, Select } from '@material-ui/core'
import Settings from '../../repositories/Settings'
import { EntryContext } from '../providers/EntryProvider'

export default function EntryEdit(props) {
    
    const initialEntry = {
        title: '...loading',
        description: '...loading',
        id: '',
        isCompleted: false,
        priority: {
            id: '0',
            label: 'n/a'
        },
        severity: {
            id: '0',
            label: 'n/a'
        },
        category: {
            id: '0',
            label: 'none'
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

        // MOVED THESE THREE FETCHES ABOVE ENTRY FETCH TO PREVENT REACT WARNING ON 'SELECT' FORM COMPONENTS
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

        getEntry(props.match.params.entryId)
        .then(setEntry)
        //TODO: move to separate component
    }, [])

    const { title, description, priority, severity, category, isCompleted } = entry

    return (
        <Paper>
            <Typography variant="h4" component="h3">
                Ticket Info
            </Typography>
            <Typography component="div">
                <form style={{ width: "50%", textAlign: "center", margin: "0 auto"}} onSubmit={handleSubmit}>
                    <FormControl component="fieldset">
                        <InputLabel>Title:</InputLabel>
                        <Input value={title} name="title" onChange={handleFieldChange}></Input>
                    </FormControl>
                    <br/>
                    <FormControl>
                        <InputLabel>Description:</InputLabel>
                        <Input value={description} name="description" onChange={handleFieldChange}></Input>
                    </FormControl>
                    <br /><br />
                    <FormControl>
                        <FormLabel>Status:</FormLabel>
                        <RadioGroup row value={isCompleted} aria-label="status" name="isCompleted" onChange={handleIsCompletedChange}>
                            <FormControlLabel value={false} control={
                                <Radio color="default" />} label="Open" />
                            <FormControlLabel value={true} control={
                                <Radio color="default" />} label="Closed"/>
                        </RadioGroup>
                    </FormControl>
                    <br/><br />
                    <FormControl style={{ margin: "0 10px"}}>
                        <InputLabel id="priority-label">Priority</InputLabel>
                        <Select
                            labelId="priority-label"
                            id="priority"
                            value={priority.id}
                            name="priority"
                            onChange={handleRadioChange}
                            >
                            <MenuItem key="0" value="0">
                                <em>n/a</em>
                            </MenuItem>
                            {priorities.map((priority)=>{
                                if (priority.id === 0){
                                    return null
                                }
                                return <MenuItem key={priority.id} value={priority.id}>{priority.label}</MenuItem>
                            })}
                        </Select>
                        <FormHelperText>Order to be fixed</FormHelperText>
                    </FormControl>
                    
                    <FormControl>
                        <InputLabel id="severity-label">Severity</InputLabel>
                        <Select
                            labelId="severity-label"
                            id="severity"
                            value={severity.id}
                            name="severity"
                            onChange={handleRadioChange}
                            
                            >
                            <MenuItem key="0" value="0">
                                <em>n/a</em>
                            </MenuItem>
                            {severities.map((severity)=>{
                                if (severity.id === 0){
                                    return null
                                }
                                return <MenuItem key={severity.id} value={severity.id}>{severity.label}</MenuItem>
                            })}
                        </Select>
                        <FormHelperText>Degree of impact</FormHelperText>
                    </FormControl>
                    <br/><br />
                    <FormControl>
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                            labelId="category-label"
                            id="category"
                            value={category.id}
                            name="category"
                            onChange={handleRadioChange}
                            
                            >
                            <MenuItem key="0" value="0">
                                <em>none</em>
                            </MenuItem>
                            {categories.map((category)=>{
                                if (category.id === 0){
                                    return null
                                }
                                return <MenuItem key={category.id} value={category.id}>{category.label}</MenuItem>
                            })}
                        </Select>
                        <FormHelperText>What type of bug is this?</FormHelperText>
                    </FormControl>
                    <br/><br />
                    <Button type="submit" color="primary" variant="contained">Save</Button>
                    <Button type="button" color="default" variant="outlined" onClick={()=>props.history.push("/home")}>Cancel</Button>
                </form>
                <br />
            </Typography>
        </Paper>
    )
}

