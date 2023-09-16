import {Button, IconButton, TextField} from '@mui/material';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import AddIcon from '@mui/icons-material/Add';
import {useAddItemForm} from './hooks/useAddItemForm';

type AddItemFormType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormType) => {
    console.log('AddItemForm is called')

    const {
        title,
        onTitleChangeHandler,
        onKeyPressHandler,
        addTask,
        error
    } = useAddItemForm(props.addItem)

    return (<div>
        <TextField variant="outlined"
                   label={'Введите значение'}
                   error={!!error}
                   helperText={error}
                   onChange={onTitleChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   value={title}/>
        <IconButton onClick={addTask}><AddIcon></AddIcon> </IconButton>
    </div>)
})