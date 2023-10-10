import {Button, IconButton} from '@mui/material';
import React, {useCallback, useState} from 'react';
import {EditableSpan} from './EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import {Task} from './Task'
import {AddItemForm} from './AddItemForm/AddItemForm';
import {TaskStatuses, TaskType } from './api/todolists-api';
import { FilterValuesType } from './state/todolists-reducer';

type PropsType = {
    id: string
    todoListTitle: string
    tasks: TaskType[]
    changeFilter: (id: FilterValuesType, todoListId: string) => void
    addTask: (newTaskTitle: string, todoListId: string) => void
    removeTask: (id: string, todoListId: string) => void
    changeTaskStatus: (tId: string, status: TaskStatuses, todoListId: string) => void
    onChangeTaskTitle: (tId: string, newTitle: string, todoListId: string) => void
    filter: FilterValuesType
    removeTodolist: (id: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
}

export const Todolist = React.memo((props: PropsType) => {

    let {
        todoListTitle,
        tasks,
        filter,
        removeTask, changeFilter,
        addTask, changeTaskStatus,
        onChangeTaskTitle,
        id
    } = props

    const [newTaskTitle, setNewTaskTitle] = useState('')

    const onAllClickHandler = useCallback(
        () => changeFilter('all', props.id), [changeFilter, props.id])

    const onActiveClickHandler = useCallback(() => changeFilter('active', props.id), [changeFilter, props.id])

    const onCompletedClickHandler = useCallback(() => changeFilter('completed', props.id), [changeFilter, props.id])

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const addTaskHandler = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }, [props.id, props.changeTodoListTitle])

    let tasksForTodoList = tasks
    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => t.status === TaskStatuses.Completed)
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
                {tasksForTodoList.map((task: TaskType) =>
                    <Task task={task}
                          removeTask={removeTask}
                          todolistId={id}
                          onChangeTaskTitle={onChangeTaskTitle}
                          changeTaskStatus={changeTaskStatus}
                          key={task.id}
                    />
                )}
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
});

