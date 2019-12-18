import React, { useContext }/* , { useEffect } */ from 'react';
import { Paper, Typography, Card, Button } from '@material-ui/core';
import { UserContext } from '../providers/UserProvider';

function convertDateTimeFromISO(date) {
    return new Date(date)
}

export default function EntryDetailsCard({ entry, history/* , deleteEntry */ }) {
	const {id, userId, title, description, severity, priority, category, isCompleted, timeStarted, timeCompleted, totalWorkTime, totalBreakTime} = entry
	
	const { getLoggedInUser } = useContext(UserContext)
	const isLoggedInUserEntry = getLoggedInUser().id === userId
	// const displayDate = convertDateTimeFromISO(timeStarted)

    // const handleDelete = () => {
    //     deleteEntry(id).then(()=>history.push("/home"))
    // }

	return (
		<Paper style={{ margin: '10px 10px', textAlign: 'center' }}>
			<Card>
				<Typography variant="h5" component="h3">
					BUG DETAILS
				</Typography>
	
				<Typography>
					<span>Title: </span>
					{title}
				</Typography>
				<Typography>
					<span>Description: </span>
					{description}
				</Typography>
				<Typography>
					<span>Status: </span>
					{isCompleted ? "Closed" : "Open"}
				</Typography>
				<Typography>
					<span>Submitted on: </span>
					{new Date(timeStarted).toLocaleString()}
				</Typography>
				<Typography>
					<span>Severity: </span>
					{severity.label}
				</Typography>
				<Typography>
					<span>Priority: </span>
					{priority.label}
				</Typography>
				<Typography>
					<span>Category: </span>
					{category.label}
				</Typography>
				{isLoggedInUserEntry && 
					<React.Fragment>
						<Button variant="outlined" color="default" onClick={()=> history.push(`/home/${id}/edit`)}>Edit</Button>
						{/* <Button variant="contained" color="secondary" onClick={deleteEntry}>Delete</Button> */}
					</React.Fragment>
				}
				<Button variant="outlined" color="primary" onClick={()=> history.goBack()}>Go back</Button>

			</Card>
		</Paper>
	);
}
