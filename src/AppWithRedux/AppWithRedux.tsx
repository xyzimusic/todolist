import React from 'react';
import '../App.css';
import {AppBar, Container, Grid, IconButton, Paper} from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {Todolist} from '../Todolist';
import {useAppWithRedux} from './hooks/useAppWithRedux';
import {TaskType, TodolistType} from '../api/todolists-api';


export  type TasksStateType = {
    [key: string]: TaskType[]
}

export function AppWithRedux() {

    const {
        todolists,
        addTodoList,
        tasksObj,
        removeTask,
        changeFilter,
        addTask,
        changeTaskStatus,
        changeTaskTitle,
        changeTodoListTitle,
        removeTodolist
    } = useAppWithRedux()

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
                        todolists.map(tl => {

                            let tasksForTodoList = tasksObj[tl.id];

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


