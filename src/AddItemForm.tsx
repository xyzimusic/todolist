import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormType) {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const TitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
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
        <input
            className={error ? 'error' : ''}
            onChange={TitleChangeHandler}
            onKeyPress={onKeyPressHandler}
            value={title}/>
        <button onClick={addTask}>+</button>
        {error && <div className="error-message">{error}</div>}
    </div>)
}