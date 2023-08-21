import {TextField} from '@mui/material';
import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    onChange: (value: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType)=> {
    console.log(`EditableSpan is called`)
    let [editMode, setEditMode] = useState<boolean>(false)
    let [title, setTitle] = useState<string>('')
    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)

    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    return (
        editMode
            ? <TextField variant="standard" onBlur={activateViewMode} onChange={onChangeTitleHandler} value={title}
                         autoFocus/>
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )

})