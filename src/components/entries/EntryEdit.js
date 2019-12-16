import React, { useState, useEffect, useContext } from 'react'
import { Paper, Typography, FormControl, InputLabel, Input, RadioGroup, Radio, FormControlLabel, FormLabel, Button, MenuItem, FormHelperText, Select } from '@material-ui/core'
import Settings from '../../repositories/Settings'
import { EntryContext } from '../providers/EntryProvider'
import Dropdowns from '../inputform/Dropdowns'

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
    const [entry, setEntry] = useState(initialEntry)

    // useContext from UserProvider
    const { getEntry, updateEntry } = useContext(EntryContext)

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
            props.history.push("/home")
        })
    }


    useEffect(()=>{
        // console.log('initial useEffect ran')
        getEntry(props.match.params.entryId)
        .then(setEntry)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.match.params.entryId])

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
                    <Dropdowns priority={priority}
                               severity={severity}
                               category={category}
                               handleRadioChange={handleRadioChange}
                    
                        />
                    <br/><br />
                    <Button type="submit" color="primary" variant="contained">Save</Button>
                    <Button type="button" color="default" variant="outlined" onClick={()=>props.history.push("/home")}>Cancel</Button>
                </form>
                <br />
            </Typography>
        </Paper>
    )
}

