import {Button, Checkbox, IconButton} from '@mui/material';
import React, {ChangeEvent, useState} from 'react';
import {AddItemForm} from './AddItemForm';
import {FilterValuesType} from './App';
import {EditableSpan} from './EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    id: string
    todoListTitle: string
    tasks: TaskType[]
    removeTask: (id: string, todoListId: string) => void
    changeFilter: (id: FilterValuesType, todoListId: string) => void
    addTask: (newTaskTitle: string, todoListId: string) => void
    changeTaskStatus: (tId: string, isDone: boolean, todoListId: string) => void
    onChangeTaskTitle: (tId: string, newTitle: string, todoListId: string) => void
    filter: FilterValuesType
    removeTodolist: (id: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void

}

export const Todolist = (props: PropsType) => {

    let {todoListTitle, tasks, removeTask, changeFilter, addTask} = props

    const [newTaskTitle, setNewTaskTitle] = useState('')


    const onAllClickHandler = () => changeFilter('all', props.id)

    const onActiveClickHandler = () => changeFilter('active', props.id)

    const onCompletedClickHandler = () => changeFilter('completed', props.id)

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const addTaskHandler = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }
    return (
        <div>
            <h3>
                <EditableSpan onChange={changeTodoListTitle} title={todoListTitle}></EditableSpan>
                <IconButton onClick={removeTodolist}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskHandler}></AddItemForm>
            <div>
                {tasks.map((item: TaskType) => {

                    const onRemoveHandler = () => {
                        removeTask(item.id, props.id)
                    }
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        console.log(e.currentTarget.checked)
                        props.changeTaskStatus(item.id, e.currentTarget.checked, props.id)
                    }

                    const onChangeTitleHandler = (newValue: string) => {
                        props.onChangeTaskTitle(item.id, newValue, props.id)
                    }


                    return (
                        <div className={item.isDone ? 'is-done' : ''} key={item.id}>
                            <Checkbox
                                onChange={onChangeStatusHandler}
                                checked={item.isDone}
                            />
                            <EditableSpan title={item.title} onChange={onChangeTitleHandler}></EditableSpan>
                            <IconButton onClick={onRemoveHandler}>
                                <DeleteIcon/>
                            </IconButton>

                        </div>
                    )
                })}
            </div>
            <div>
                <Button variant={props.filter == 'all' ? 'contained' : 'text'} onClick={onAllClickHandler}>All
                </Button>
                <Button variant={props.filter == 'active' ? 'contained' : 'text'} color={'primary'}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button variant={props.filter == 'completed' ? 'contained' : 'text'} color={'secondary'}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    );
};

