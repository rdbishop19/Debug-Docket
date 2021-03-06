import React, { useState, useContext, useEffect, useRef } from 'react';
import EntryCard from './EntryCard';
import EntryInputNew from './EntryInputNew';
import { EntryContext } from '../providers/EntryProvider';
import { UserContext } from '../providers/UserProvider';
import { Paper, Typography, List, ListItem, useTheme, ListItemIcon, Tooltip, IconButton } from '@material-ui/core';
import TimerIcon from '@material-ui/icons/Timer';
import { TimerContext } from '../providers/TimerProvider';

export default function EntriesHomeContainer(props) {
	const { entries, userEntries, createEntry, updateEntry, getUserEntries, deleteEntry, setUserEntries } = useContext(
		EntryContext
	);
	const theme = useTheme();
	const { palette: { type, primary, secondary } } = theme;

	const [ isEditing, setIsEditing ] = useState(false);
	const [ editingId, setEditingId ] = useState();

	const storedSelected = JSON.parse(localStorage.getItem('currentEntry'));
	const storeSelected = useRef(storedSelected !== null ? storedSelected : -1);
	const [ selectedIndex, setSelectedIndex ] = useState(-1);
	
	useEffect(()=>{
		// console.log('useEffect')
		if (storedSelected !== null){
			const findSelected = (entry) => entry.id === storedSelected.id
			const found = userEntries.findIndex(findSelected)
			setSelectedIndex(found)
		}
	}, [userEntries])
	// console.log('found', found)
	const [ hoveredItem, setHoveredItem ] = useState();

	const { getLoggedInUser, loggedInUser } = useContext(UserContext);
	const { updateDatabaseEntry, resetTimers } = useContext(TimerContext);
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

	const handleListItemClick = (index, item) => {
		// console.log(index, selectedIndex)
		if (window.confirm('This will reset the current timer')) {
			resetTimers();
			storeSelected.current = index;
			if (index === selectedIndex) { // user is un-selecting the currently selected entry
				setSelectedIndex(-1);
				localStorage.removeItem('currentEntry');
			} else {	// user selecting new entry to track
				localStorage.setItem('currentEntry', JSON.stringify(item));
				setSelectedIndex(index);
			}
		}
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
		return () => {
			localStorage.setItem('currentTimerEntry', storeSelected.current);
		};
	}, []);

	return (
		<div style={{ flex: 1 }}>
			<h3>DOCK IT</h3>
			<EntryInputNew addNew={addNew} activeUser={activeUser} />
			{/* <Typography variant="h5"> */}
			<h3>MY TICKETS</h3>
			{/* </Typography> */}
			<Paper style={{ width: '97%', margin: '0 10px', height: '57vh', overflow: "auto" }}>
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
								// onClick={(event) => handleListItemClick(event, index)}
								onMouseEnter={(event) => handleMouseOver(event, index)}
								onMouseLeave={(event) => handleMouseOut(event, index)}
								style={{ margin: '0 auto', padding: '0px' }}
							>
								{/* <Tooltip title="Double click to set timer"> */}
								<React.Fragment>
									{hoveredItem === index &&
									selectedIndex !== index && (
										<Tooltip title="Set active">
											<ListItemIcon
												style={{
													marginRight: '-66px',
													marginLeft: '10px',
													cursor: 'pointer'
												}}
												onClick={() => handleListItemClick(index, item)}
											>
												<TimerIcon color="disabled" />
											</ListItemIcon>
										</Tooltip>
									)}
									{selectedIndex === index && (
										<Tooltip title="Active timer. Click to stop tracking.">
											<ListItemIcon
												style={{ marginRight: '-80px', marginLeft: '10px', cursor: 'pointer' }}
												onClick={() => handleListItemClick(index, item)}
											>
												<TimerIcon color={type === 'light' ? 'primary' : 'secondary'} />
											</ListItemIcon>
										</Tooltip>
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
								</React.Fragment>
								{/* </Tooltip> */}
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
