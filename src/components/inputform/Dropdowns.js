import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText, useTheme } from '@material-ui/core';
import Settings from '../../repositories/Settings';

export default function Dropdowns(props) {
	const { priority, severity, category, handleRadioChange } = props;
	const [ priorities, setPriorities ] = useState([]);
	const [ severities, setSeverities ] = useState([]);
	const [ categories, setCategories ] = useState([]);

	useEffect(() => {
		fetch(`${Settings.remoteURL}/priorities`).then((data) => data.json()).then(setPriorities);

		fetch(`${Settings.remoteURL}/severities`).then((data) => data.json()).then(setSeverities);

		fetch(`${Settings.remoteURL}/categories`).then((data) => data.json()).then(setCategories);
    }, []);
    
    const theme = useTheme()
    const { palette: { type, /* primary, secondary, error */ }} = theme
    
    const inputStyle = {
        color: type === "light" ? "primary" : "secondary"
    }

	return (
		<React.Fragment>
			<FormControl color={inputStyle.color}>
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
					{priorities.map((priority) => {
						if (priority.id === 0) {
							return null;
						}
						return (
							<MenuItem key={priority.id} value={priority.id}>
								{priority.label}
							</MenuItem>
						);
					})}
				</Select>
				<FormHelperText>Order to be fixed</FormHelperText>
			</FormControl>

			<FormControl color={inputStyle.color}>
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
					{severities.map((severity) => {
						if (severity.id === 0) {
							return null;
						}
						return (
							<MenuItem key={severity.id} value={severity.id}>
								{severity.label}
							</MenuItem>
						);
					})}
				</Select>
				<FormHelperText>Degree of impact</FormHelperText>
			</FormControl>
			{/* <br />
			<br /> */}
			<FormControl color={inputStyle.color}>
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
					{categories.map((category) => {
						if (category.id === 0) {
							return null;
						}
						return (
							<MenuItem key={category.id} value={category.id}>
								{category.label}
							</MenuItem>
						);
					})}
				</Select>
				<FormHelperText>What type of bug is this?</FormHelperText>
			</FormControl>
		</React.Fragment>
	);
}
