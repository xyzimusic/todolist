import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AppBar, Container, Grid, IconButton, Paper} from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    FilterValuesType,
    removeTodolistAC,
    todolistsReducer
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';
import {AddItemForm} from './AddItemForm/AddItemForm';
import {TaskPriorities, TaskStatuses, TaskType} from './api/todolists-api';

export  type TasksStateType = {
    [key: string]: TaskType[]
}

export function AppWithReducers() {

    const changeTaskStatus = (tId: string, status: TaskStatuses, todolistId: string) => {
        const action = changeTaskStatusAC(tId, status, todolistId)
        dispatchToTasksReducer(action)
    }

    const changeTaskTitle = (tId: string, newValue: string, todolistId: string) => {
        const action = changeTaskTitleAC(tId, newValue, todolistId)
        dispatchToTasksReducer(action)
    }

    function removeTask(id: string, todolistId: string) {
        const action = removeTaskAC(id, todolistId)
        dispatchToTasksReducer(action)
    }

    function changeTodoListTitle(id: string, newTitle: string) {
        const action = changeTodolistTitleAC(id, newTitle)
        dispatchToTodolists(action)
    }


    const addTask = (newTaskTitle: string, todolistId: string) => {
        const action = addTaskAC(newTaskTitle, todolistId)
        dispatchToTasksReducer(action)
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        const action = changeTodolistFilterAC(todoListId, value)
        dispatchToTodolists(action)
    }

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
            {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
            {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
        ]
    )

    let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistId1]: [
            {
                id: v1(),
                title: 'HTML&CSS',
                status: TaskStatuses.Completed,
                isDone: true,
                todoListId: todolistId1,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
            },
            {
                id: v1(),
                title: 'JS',
                status: TaskStatuses.Completed,
                isDone: true,
                todoListId: todolistId1,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
            },
            {
                id: v1(),
                title: 'ReactJS',
                status: TaskStatuses.New,
                isDone: true,
                todoListId: todolistId1,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
            },
            {
                id: v1(),
                title: 'Redux',
                status: TaskStatuses.New,
                isDone: true,
                todoListId: todolistId1,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
            },
        ],
        [todolistId2]: [
            {
                id: v1(),
                title: 'Book',
                status: TaskStatuses.New,
                isDone: true,
                todoListId: todolistId2,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
            },
            {
                id: v1(),
                title: 'Book',
                status: TaskStatuses.Completed,
                isDone: true,
                todoListId: todolistId2,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
            },
        ]
    })

    let removeTodolist = (todoListId: string) => {

        const action = removeTodolistAC(todoListId)
        dispatchToTodolists(action)
        dispatchToTasksReducer(action)
    }

    const addTodoList = (title: string) => {

        const action = addTodolistAC(title)
        dispatchToTodolists(action)
        dispatchToTasksReducer(action)
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
                        todolists.map(tl => {

                            let tasksForTodoList = tasksObj[tl.id];

                            if (tl.filter === 'completed') {
                                tasksForTodoList = tasksForTodoList.filter((t: {
                                    status: TaskStatuses;
                                }) => t.status = TaskStatuses.Completed)
                            }
                            if (tl.filter === 'active') {
                                tasksForTodoList = tasksForTodoList.filter((t: {
                                    status: TaskStatuses;
                                }) => t.status = TaskStatuses.New)
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


