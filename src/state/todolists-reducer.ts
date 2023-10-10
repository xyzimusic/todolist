import {v1} from 'uuid'
import {TodolistType} from '../api/todolists-api'

export type FilterValuesType = 'all' | 'completed' | 'active'

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {
        type: 'ADD-TODOLIST',
        title,
        todolistId: v1()
    }
}


export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        id: todolistId
    }
}
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId,
        filter
    }
}

export const changeTodolistTitleAC = (todolistId: string, newTodoListTitle: string): ChangeTodolistTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId,
        title: newTodoListTitle
    }
}

export type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export let todolistId1 = v1()
export let todolistId2 = v1()


const initialState: TodolistDomainType[] = []

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionType): TodolistDomainType[] => {

    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id != action.id)
        }

        case 'ADD-TODOLIST': {
            return [{
                id: action.todolistId,
                filter: 'all',
                title: action.title,
                addedDate:'',
                order:0
            }, ...state]
        }


        case 'CHANGE-TODOLIST-TITLE': {

            let todolist = state.find((tl) => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        }

        case 'CHANGE-TODOLIST-FILTER': {
            let todolist = state.find((tl) => tl.id === action.id)
            if (todolist) {
                todolist.filter = action.filter
            }
            return [...state]
        }

        default:
            return state
    }
}