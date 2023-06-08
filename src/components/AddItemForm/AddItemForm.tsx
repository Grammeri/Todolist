import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { IconButton, TextField } from '@mui/material';
import { AddBox } from '@mui/icons-material';

type AddItemFormPropsType = {
	addItem: (title: string) => void;
	disabled?: boolean;
};

export const AddItemForm = React.memo(function ({ addItem, disabled = false }: AddItemFormPropsType) {
	let [title, setTitle] = useState('');
	let [error, setError] = useState<string | null>(null);

	const addItemHandler = () => {
		if (title.trim() !== '') {
			addItem(title);
			setTitle('');
		} else {
			setError('Title is required');
		}
	};

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value);
	};

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (error !== null) {
			setError(null);
		}
		if (e.charCode === 13) {
			addItemHandler();
		}
	};

	const inputStyle = {
		backgroundColor: 'white',
		flexGrow: 50, // Adjust the flexGrow value to control the length towards the left
		marginRight: '10px', // Add any desired right margin
	};

	return (
		<div style={{ display: 'flex', alignItems: 'center' }}>
			<TextField
				variant="outlined"
				disabled={disabled}
				error={!!error}
				value={title}
				onChange={onChangeHandler}
				onKeyDown={onKeyPressHandler}
				label="Title"
				helperText={error}
				style={inputStyle}
			/>
			<IconButton
				color="primary"
				onClick={addItemHandler}
				disabled={disabled}
				style={{ backgroundColor: 'transparent' }}
			>
				<AddBox />
			</IconButton>
		</div>
	);
});
