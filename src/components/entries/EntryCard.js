import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { Tooltip, Card, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import EntryQuickEdit from './EntryQuickEdit';

function convertDateTimeFromISO(date) {
	return new Date(date);
}

export default function EntryCard(props) {
	const theme = useTheme()
	const { palette: { type, primary, secondary, error }} = theme
	const { item, isEditing, edit, editingId, cancelEdit, updateItem, deleteItem, match, history, isCurrentTimer } = props;
	// console.log(theme)

	const { isCompleted } = item

	const listStyle = {
		backgroundColor: isCompleted ? secondary.light : error.dark ,
		textDecoration: isCompleted ? "line-through" : 'none',
		color: isCompleted ? "black" : "white",
		padding: '5px',
		margin: '5px 5px',
		border: '0.2px solid black',
		borderRadius: '5px',
		cursor: 'pointer',
		width: "90%",
		marginLeft: "10%",
	};

	const handleClick = (e) => {
		edit(item.id);
	};

	return (
		<Card onClick={handleClick} style={listStyle}>
			{isEditing && editingId === item.id ? (
				<React.Fragment>
					{/* <span>Quick Edit</span> */}
					<EntryQuickEdit
						cancelEdit={cancelEdit}
						deleteItem={deleteItem}
						updateItem={updateItem}
						item={item}
						history={history}
						match={match}
					/>
				</React.Fragment>
			) : (
				<Tooltip title="Click to edit" aria-label="click-to-edit">
					<Typography component="p" style={{ textAlign: 'left', paddingLeft: '15px' }}>
						{/* <FontAwesomeIcon style={{ marginRight: '10px' }} icon={faCheckSquare} /> */}
						<span>{item.title}</span>
					</Typography>
				</Tooltip>
			)}
		</Card>
	);
}
