import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Container, Grid, IconButton, Paper} from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import {addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppRootState } from './state/store';

export type FilterValuesType = 'all' | 'completed' | 'active'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export  type TasksStateType = {
    [key: string]: TaskType[]
}

export function AppWithRedux() {

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, TodolistType[]>(state => state.todolists)
    const tasksObj = useSelector<AppRootState, TasksStateType>(state => state.tasks)

    const changeTaskStatus = (tId: string, isDone: boolean, todolistId: string) => {
        const action = changeTaskStatusAC(tId, isDone, todolistId)
        dispatch(action)
    }

    const changeTaskTitle = (tId: string, newValue: string, todolistId: string) => {
        const action = changeTaskTitleAC(tId, newValue, todolistId)
        dispatch(action)
    }

    function removeTask(id: string, todolistId: string) {
        const action = removeTaskAC(id, todolistId)
        dispatch(action)
    }

    function changeTodoListTitle(id: string, newTitle: string) {
        const action = changeTodolistTitleAC(id, newTitle)
        dispatch(action)
    }


    const addTask = (newTaskTitle: string, todolistId: string) => {
        const action = addTaskAC(newTaskTitle, todolistId)
        dispatch(action)
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        const action = changeTodolistFilterAC(todoListId, value)
        dispatch(action)
    }

    let todolistId1 = v1()
    let todolistId2 = v1()



    let removeTodolist = (todoListId: string) => {

        const action = removeTodolistAC(todoListId)
        dispatch(action)
    }

    const addTodoList = (title: string) => {

        const action = addTodolistAC(title)
        dispatch(action)
    }
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '10px'}}>
                    <AddItemForm addItem={addTodoList}></AddItemForm>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((tl: TodolistType) => {

                            let tasksForTodoList = tasksObj[tl.id];

                            if (tl.filter === 'completed') {
                                tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
                            }
                            if (tl.filter === 'active') {
                                tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
                            }

                            return (<Grid item>
                                    <Paper style={{padding: '10px'}}>
                                        <Todolist
                                            key={tl.id}
                                            id={tl.id}
                                            todoListTitle={tl.title}
                                            tasks={tasksForTodoList}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeTaskStatus}
                                            onChangeTaskTitle={changeTaskTitle}
                                            filter={tl.filter}
                                            removeTodolist={removeTodolist}
                                            changeTodoListTitle={changeTodoListTitle}
                                        />
                                    </Paper>
                                </Grid>

                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}


