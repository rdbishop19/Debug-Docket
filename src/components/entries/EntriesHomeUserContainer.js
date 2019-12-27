import React, { useState, useContext, useEffect } from 'react';
import EntryCard from './EntryCard';
import EntryInputNew from './EntryInputNew';
import { EntryContext } from '../providers/EntryProvider';
import { UserContext } from '../providers/UserProvider';
import { Paper, Typography, List, ListItem, useTheme } from '@material-ui/core';
import TimerIcon from '@material-ui/icons/Timer';

export default function EntriesHomeContainer(props) {
	const theme = useTheme();
	const { palette: { type, primary, secondary } } = theme;

	const [ isEditing, setIsEditing ] = useState(false);
	const [ editingId, setEditingId ] = useState();
	const [ selectedIndex, setSelectedIndex ] = React.useState(0);
	const [ hoveredItem, setHoveredItem ] = useState();

	const { entries, userEntries, createEntry, updateEntry, getUserEntries, deleteEntry, setUserEntries } = useContext(
		EntryContext
	);
	const { getLoggedInUser, loggedInUser } = useContext(UserContext);
	const activeUser = getLoggedInUser();

	const addNew = (todo) => {
		const newEntry = {
			userId: activeUser.id,
			title: todo,
			description: '',
			timeStarted: new Date().toISOString(),
			timeCompleted: '',
			isCompleted: false,
			severityId: 0,
			priorityId: 0,
			categoryId: 0,
			totalWorkTime: 0,
			totalBreakTime: 0
		};
		createEntry(newEntry).then(getUserEntries);
	};

	const edit = (id) => {
		if (!isEditing) {
			setIsEditing(true);
		}
		setEditingId(id);
	};
	const cancelEdit = () => {
		setIsEditing(false);
	};

	const deleteItem = (id) => {
		if (window.confirm('Delete this entry?')) {
			deleteEntry(id).then(getUserEntries);
			setIsEditing(false);
			setEditingId();
		}
	};

	const updateItem = (todo, index) => {
		const entryEdit = {
			id: index,
			title: todo.title,
			description: todo.description
		};
		setIsEditing(false);
		setEditingId();
		updateEntry(entryEdit).then(getUserEntries);
	};

	useEffect(
		() => {
			// console.log('entries home', getLoggedInUser())
			getUserEntries();
		},
		[ loggedInUser ]
	);

	const handleListItemClick = (event, index) => {
		setSelectedIndex(index);
	};

	const handleMouseOver = (event, index) => {
		// console.log('mouse over')
		setHoveredItem(index);
	};
	const handleMouseOut = (event, index) => {
		// console.log('mouse out')
		setHoveredItem();
	};
	useEffect(() => {
		setUserEntries([]);
	}, []);

	return (
		<div style={{ flex: 1 }}>
			<h3>DOCK IT</h3>
			<EntryInputNew addNew={addNew} activeUser={activeUser} />
			{/* <Typography variant="h5"> */}
			<h3>MY TICKETS</h3>
			{/* </Typography> */}
			<Paper style={{ width: '97%', margin: '0 10px' }}>
				<br />
				<Typography variant="caption" style={{ opacity: '0.5' }}>
					most recent
				</Typography>
				<List>
					{userEntries.map((item, index) => {
						return (
							<ListItem
								selected={selectedIndex === index}
								key={item.id}
								onClick={(event) => handleListItemClick(event, index)}
								onMouseOver={(event) => handleMouseOver(event, index)}
								onMouseOut={(event) => handleMouseOut(event, index)}
								style={{ margin: '0 auto', padding: '0px' }}
							>
								{hoveredItem === index &&
								selectedIndex !== index && (
									<TimerIcon color="disabled" style={{ marginRight: '-45px', marginLeft: '10px' }} />
								)}
								{selectedIndex === index && (
									<TimerIcon
										color={type === 'light' ? 'primary' : 'secondary'}
										style={{ marginRight: '-45px', marginLeft: '10px' }}
									/>
								)}
								<EntryCard
									item={item}
									isCurrentTimer={hoveredItem === index}
									isEditing={isEditing}
									editingId={editingId}
									edit={edit}
									updateItem={updateItem}
									deleteItem={deleteItem}
									cancelEdit={cancelEdit}
									{...props}
								/>
							</ListItem>
						);
					})}
				</List>
				<Typography variant="caption" style={{ opacity: '0.5' }}>
					oldest
				</Typography>
			</Paper>
		</div>
	);
}
