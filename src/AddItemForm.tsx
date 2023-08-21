import {Button, IconButton, TextField} from '@mui/material';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import AddIcon from '@mui/icons-material/Add';

type AddItemFormType = {
    addItem: (title: string) => void
}

export const  AddItemForm = React.memo((props: AddItemFormType) => {
    console.log('AddItemForm is called')

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const TitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
       !!error && setError(null)
        if (event.ctrlKey && event.charCode === 13) {
            addTask()
        }
    }

    const addTask = () => {
        if (title.trim() === '') {
            setTitle('')
            setError('Title is required!')
            return
        }
        props.addItem(title.trim())
        setTitle('')
    }

    return (<div>
        <TextField variant="outlined"
                   label={'Введите значение'}
                   error={!!error}
                   helperText={error}
                   onChange={TitleChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   value={title}/>
        <IconButton onClick={addTask}><AddIcon></AddIcon> </IconButton>
    </div>)
})