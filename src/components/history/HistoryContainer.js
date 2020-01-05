import React, { useEffect, useState, useRef } from 'react';
import { EntryContext } from '../providers/EntryProvider';
import { UserContext } from '../providers/UserProvider';
import HistoryList from './HistoryList';
import { Input, Typography, Button, Grid, Card, useTheme } from '@material-ui/core';
import Dropdowns from '../inputform/Dropdowns';
import StatsContainer from '../stats/StatsContainer';

export default function HistoryContainer(props) {
	const { entries, userEntries, getUserEntries, deleteEntry } = React.useContext(EntryContext);
	const { getLoggedInUser } = React.useContext(UserContext);
	const [ searchTerm, setSearchTerm ] = useState('');

	const theme = useTheme();
	const { palette: { type/* , primary, secondary, error */ } } = theme;

	const inputStyle = {
		color: type === 'light' ? 'primary' : 'secondary'
	};

	const initialFilter = {
		isCompleted: false,
		priority: {
			id: '',
			label: 'n/a'
		},
		severity: {
			id: '',
			label: 'n/a'
		},
		category: {
			id: '',
			label: 'none'
		}
	};
	const [ filter, setFilter ] = useState(initialFilter);
	const { priority, severity, category } = filter;

	const activeUser = getLoggedInUser();
	const [ filteredEntries, setFilteredEntries ] = useState([]);

	const handleChange = (e) => {
		setSearchTerm(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const handleRadioChange = (e) => {
		setFilter({ ...filter, [e.target.name]: { id: Number(e.target.value) } });
		// console.log('filter', filter)
	};

	const clearFilters = () => {
		// setFilter(initialFilter)
		setFilteredEntries(userEntries);
	};

	const deleteHistoryEntry = (id) => {
		if (window.confirm('Delete this entry?')) {
			deleteEntry(id).then(getUserEntries);
		}
	};
	// const filterClosedEntries = (total, entry) {
	//     if (entry.isCompleted){
	//         return total + 1
	//     }
	// }
	// for when user selects radio dropdowns
	useEffect(
		() => {
			// console.log('filtering')
			//reset list each time
			setFilteredEntries(userEntries);
			const filteredEntries = userEntries.filter((item) => {
				const { severity, priority, category } = filter;
				const { severityId, priorityId, categoryId } = item;
				const severityMatch = severity.id === severityId && severity.id !== '';
				const priorityMatch = priority.id === priorityId && priority.id !== '';
				const categoryMatch = category.id === categoryId && category.id !== '';
				return severityMatch && priorityMatch && categoryMatch;
			});
			// console.log('filteredEntries', filteredEntries)
			setFilteredEntries(filteredEntries);
		},
		[ filter ]
	);

	useEffect(
		() => {
			// console.log('useEffect')
			setFilteredEntries(userEntries);
			const filteredEntries = userEntries.filter((entry) => {
				const searchLower = searchTerm.toLowerCase();
				const title = entry.title.toLowerCase();
				const description = entry.description.toLowerCase();
				return title.includes(searchLower) || description.includes(searchLower);
			});
			setFilteredEntries(filteredEntries);
		},
		[ activeUser.id, entries, userEntries, searchTerm ]
	);

	useEffect(
		() => {
			getUserEntries(activeUser.id).then(setFilteredEntries);
			// eslint-disable-next-line react-hooks/exhaustive-deps
		},
		[ activeUser.id ]
	);

	return (
		<Grid container spacing={1}>
			<Grid item xs={6} sm={3}>
				{/* <React.Fragment> */}
				<Typography variant="h6" component="h3" style={{ textAlign: 'center' }}>
					SEARCH
				</Typography>
				<Card style={{ textAlign: 'center', margin: '0 10px', padding: '10px' }}>
					<form onSubmit={handleSubmit}>
						<Input
							placeholder="Search entries by keyword"
							value={searchTerm}
							onChange={handleChange}
							style={{ width: '100%' }}
							color={inputStyle.color}
						/>
					</form>
					<br />
				</Card>
				<Typography variant="h6" component="h3" style={{ textAlign: 'center' }}>
					FILTER
				</Typography>
				<Card
					style={{
						textAlign: 'center',
						margin: '0 10px',
						height: '400px',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-around',
						padding: '10px'
					}}
				>
					<Dropdowns
						priority={priority}
						severity={severity}
						category={category}
						handleRadioChange={handleRadioChange}
					/>
					<br />
					<Button variant="contained" color="secondary" onClick={clearFilters}>
						Clear Filters
					</Button>
				</Card>
				{/* <br /> */}
				{/* <br /> */}
			</Grid>
			<Grid item xs={6} sm={6}>
				<Typography variant="h6" component="h3" style={{ textAlign: 'center' }}>
					BUG HISTORY
				</Typography>
				<HistoryList
					entries={filteredEntries}
					isFiltering={userEntries > filteredEntries}
					activeUser={activeUser}
					deleteHistoryEntry={deleteHistoryEntry}
					{...props}
				/>
			</Grid>
			<Grid item xs={6} sm={3}>
				<Typography variant="h6" style={{ textAlign: 'center' }}>
					STATS
				</Typography>
                <StatsContainer />		
			</Grid>
			{/* </React.Fragment> */}
		</Grid>
	);
}
