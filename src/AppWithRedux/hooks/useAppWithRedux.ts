import {useCallback} from 'react';
import '../App.css';
import {v1} from 'uuid';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from '../../state/store';
import {TodolistType} from '../../AppWithReducers';
import {FilterValuesType, TasksStateType} from '../AppWithRedux';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from '../../state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../../state/tasks-reducer';


export const useAppWithRedux = () => {

    let todolistId1 = v1()
    let todolistId2 = v1()

    const dispatch = useDispatch()

    const todolists = useSelector<AppRootState, TodolistType[]>(state => state.todolists)
    const tasksObj = useSelector<AppRootState, TasksStateType>(state => state.tasks)

    const changeTaskStatus = useCallback((tId: string, isDone: boolean, todolistId: string) => {
        const action = changeTaskStatusAC(tId, isDone, todolistId)
        dispatch(action)
    }, [dispatch])
    const changeTaskTitle = useCallback((tId: string, newValue: string, todolistId: string) => {
        const action = changeTaskTitleAC(tId, newValue, todolistId)
        dispatch(action)
    }, [dispatch])
    const removeTask = useCallback((id: string, todolistId: string) => {
        const action = removeTaskAC(id, todolistId)
        dispatch(action)
    }, [dispatch])
    const changeTodoListTitle = useCallback((id: string, newTitle: string) => {
        const action = changeTodolistTitleAC(id, newTitle)
        dispatch(action)
    }, [dispatch])
    const addTask = useCallback((newTaskTitle: string, todolistId: string) => {
        const action = addTaskAC(newTaskTitle, todolistId)
        dispatch(action)
    }, [dispatch])
    const changeFilter = useCallback((value: FilterValuesType, todoListId: string) => {
        const action = changeTodolistFilterAC(todoListId, value)
        dispatch(action)
    }, [dispatch])
    const removeTodolist = useCallback((todoListId: string) => {
        const action = removeTodolistAC(todoListId)
        dispatch(action)
    }, [dispatch])
    const addTodoList = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch])

    return {
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
    }
}