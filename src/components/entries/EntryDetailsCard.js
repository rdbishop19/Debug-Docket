import React/* , { useEffect } */ from 'react';
import { Paper, Typography } from '@material-ui/core';

export default function EntryDetailsCard({ entry }) {
	const {title, description, severity, priority, category} = entry
	// let title = '';
	// let description = '';
	// if (entry.length) {
	// 	title = entry[0].title;
	// 	description = entry[0].description;
	// }

	// useEffect(
	// 	() => {
	// 		console.log('card mounted');
	// 	},
	// 	[ entry ]
	// );

	return (
		<Paper style={{ margin: '10px 10px', textAlign: 'center' }}>
			<Typography variant="h5" component="h3">
				BUG DETAILS
			</Typography>

			<Typography>
				<span>Title: </span>
				{title}
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

			<Typography>
				<span>Description: </span>
				{description}
			</Typography>
		</Paper>
	);
}
