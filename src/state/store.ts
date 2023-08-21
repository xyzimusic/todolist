import {combineReducers, createStore} from 'redux';
import {TasksStateType, TodolistType} from '../App';
import {tasksReducer} from './tasks-reducer';
import {todolistsReducer} from './todolists-reducer';


const rootReducer = combineReducers(
    {
        todolists: todolistsReducer,
        tasks: tasksReducer,
    }
)
// export type AppRootState = {
//     todolists:TodolistType[],
//     task: TasksStateType
// }

export type AppRootState = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer)

// @ts-ignore
window.store = store;