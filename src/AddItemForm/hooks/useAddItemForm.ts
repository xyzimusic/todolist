
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
export const useAddItemForm = (onItemAdded:(title:string)=>void)=>{

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
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
        onItemAdded(title.trim())
        setTitle('')
    }


    return{
        title,
        onTitleChangeHandler,
        onKeyPressHandler,
        addTask,
        error
    }
}

