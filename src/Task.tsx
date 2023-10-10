import {IconButton} from '@mui/material';
import Checkbox from '@mui/material/Checkbox/Checkbox';
import React, {ChangeEvent, useCallback} from 'react';
import {EditableSpan} from './EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import {TaskStatuses, TaskType} from './api/todolists-api';

type TaskPropsType = {
    removeTask: (id: string, todoListId: string) => void
    onChangeTaskTitle: (tId: string, newTitle: string, todoListId: string) => void
    changeTaskStatus: (tId: string, status: TaskStatuses, todoListId: string) => void
    task: TaskType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {

    const onRemoveHandler = useCallback(() => {
        props.removeTask(props.task.id, props.todolistId)
    }, [])

    const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.checked)
        props.changeTaskStatus(props.task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New,
            props.todolistId)
    }, [props.changeTaskStatus, props.task.id, props.todolistId])

    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.onChangeTaskTitle(props.task.id, newValue, props.todolistId)
    }, [props.onChangeTaskTitle, props.task.id, props.todolistId])

    return (
        <div className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
            <Checkbox
                onChange={onChangeStatusHandler}
                checked={props.task.status === TaskStatuses.Completed}
            />
            <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}></EditableSpan>
            <IconButton onClick={onRemoveHandler}>
                <DeleteIcon/>
            </IconButton>
        </div>
    )
})