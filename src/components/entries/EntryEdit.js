import React, { useState, useEffect, useContext } from 'react'
import { Paper, Typography, FormControl, InputLabel, Input, RadioGroup, Radio, FormControlLabel, FormLabel } from '@material-ui/core'
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
    const { getEntry } = useContext(EntryContext)

    const [entry, setEntry] = useState(initialEntry)
    
    const [priorities, setPriorities] = useState([])
    const [severities, setSeverities] = useState([])
    const [categories, setCategories] = useState([])

    const handleFieldChange = e => {
        setEntry({...entry, [e.target.name]: e.target.value})
    }

    // const handleRadioChange = e=> {
    //     setEntry({...entry, [e.target.name]: {}})
    // }


    useEffect(()=>{
        console.log('initial useEffect ran')
        getEntry(props.match.params.entryId)
        .then((result)=>{
            setEntry(result)
        })
        //TODO: move to separate component
        fetch(`${Settings.remoteURL}/priorities`)
        .then((data)=>data.json())
        .then((data)=>{
            setPriorities(data)
        })
        //TODO: move to separate component
        fetch(`${Settings.remoteURL}/severities`)
        .then((data)=>data.json())
        .then((data)=>{
            setSeverities(data)
        })
        //TODO: move to separate component
        fetch(`${Settings.remoteURL}/categories`)
        .then((data)=>data.json())
        .then((data)=>{
            setCategories(data)
            // console.log('data', data)
        })
        //TODO: move to separate component
        fetch(`${Settings.remoteURL}/categories`)
        .then((data)=>data.json())
        .then((data)=>{
            setCategories(data)
        })
    }, [])

    const { title, description, priority, severity, category, isCompleted } = entry

    return (
        <Paper>
            <form style={{ width: "50%", textAlign: "center", margin: "0 auto"}}>
                <Typography>Bug Ticket</Typography>
                <FormControl component="fieldset">
                    <InputLabel>Title:</InputLabel>
                    <Input value={title} name="title" onChange={handleFieldChange}></Input>
                </FormControl>

                <FormControl>
                    <InputLabel>Description:</InputLabel>
                    <Input value={description} name="description" onChange={handleFieldChange}></Input>
                </FormControl>

                <FormControl>
                    <FormLabel>Priority:</FormLabel>
                    <RadioGroup value={priority.id} aria-label="priority" name="priority">
                        {priorities.map((priority)=>{
                            return <FormControlLabel key={priority.id} value={priority.id} label={priority.label} control={
                                <Radio color="default" />} />
                        })}
                    </RadioGroup>
                </FormControl>

                <FormControl>
                    <FormLabel>Severity:</FormLabel>
                    <RadioGroup value={severity.id} aria-label="severity" name="severity">
                        {severities.map((severity)=>{
                            return <FormControlLabel key={severity.id} value={severity.id} label={severity.label} control={
                                <Radio color="default" />} />
                        })}
                    </RadioGroup>
                </FormControl>

                <FormControl>
                    <FormLabel>Category:</FormLabel>
                    <RadioGroup value={category.id} aria-label="category" name="category">
                        {categories.map((category)=>{
                            return <FormControlLabel key={category.id} value={category.id} label={category.label} control={
                                <Radio color="default" />} />
                        })}
                    </RadioGroup>
                </FormControl>

                <FormControl>
                    <FormLabel>Status:</FormLabel>
                    <RadioGroup defaultValue={isCompleted} aria-label="status" name="status">
                        <FormControlLabel value={false} control={
                        <Radio color="default" />} label="Open" />
                        <FormControlLabel value={true} control={
                        <Radio color="default" />} label="Closed"/>
                    </RadioGroup>
                </FormControl>
            </form>
        </Paper>
    )
}

