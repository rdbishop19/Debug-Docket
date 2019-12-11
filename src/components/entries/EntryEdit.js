import React, { useState, useEffect } from 'react'
import { Paper, Typography, FormControl, InputLabel, Input, RadioGroup, Radio, FormControlLabel, FormLabel } from '@material-ui/core'
import Settings from '../../repositories/Settings'


export default function EntryEdit() {

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
        },
    }

    const [entry, setEntry] = useState(initialEntry)
    // const [title, setTitle] = useState('')
    const [priorities, setPriorities] = useState([])
    const [severities, setSeverities] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(()=>{
        fetch(`${Settings.remoteURL}/entries/1?_expand=severity&_expand=priority&_expand=category`)
        .then((data)=>data.json())
        .then((data)=> {
            console.log('fetch', data)
            setEntry(data)
            // setTitle(data.title)
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
        })
    }, [])

    const { title, description, priority, severity, category } = entry
    console.log('priority', priority)

    return (
        <Paper>
            <form style={{ width: "50%", textAlign: "center", margin: "0 auto"}}>
                <Typography>Bug Ticket</Typography>
                <FormControl component="fieldset">
                    <InputLabel>Title:</InputLabel>
                    <Input value={title}></Input>
                </FormControl>
                <FormControl>
                    <InputLabel>Description:</InputLabel>
                    <Input value={description}></Input>
                </FormControl>
                <FormControl>
                    <FormLabel>Priority:</FormLabel>
                    <RadioGroup value={priority.id} aria-label="priority">
                        {priorities.map((priority)=>{
                            return <FormControlLabel value={priority.id} label={priority.label} control={
                                <Radio color="default" />} />
                        })}
                    </RadioGroup>
                </FormControl>
                <FormControl>
                    <FormLabel>Severity:</FormLabel>
                    <RadioGroup value={severity.id} aria-label="severity">
                        {severities.map((severity)=>{
                            return <FormControlLabel value={severity.id} label={severity.label} control={
                                <Radio color="default" />} />
                        })}
                    </RadioGroup>
                </FormControl>
                <FormControl>
                    <FormLabel>Category:</FormLabel>
                    <RadioGroup value={category.id} aria-label="category">
                        {categories.map((category)=>{
                            return <FormControlLabel value={category.id} label={category.label} control={
                                <Radio color="default" />} />
                        })}
                    </RadioGroup>
                </FormControl>
                <FormControl>
                    <FormLabel>Status:</FormLabel>
                    <RadioGroup defaultValue="0" aria-label="status">
                    <FormControlLabel value="0" control={
                        <Radio color="default" />} label="Open" />
                        <FormControlLabel value="1" control={
                        <Radio color="default" />} label="Closed"/>
                    </RadioGroup>
                </FormControl>
            </form>
        </Paper>
    )
}

