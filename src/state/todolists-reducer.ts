import { v1 } from 'uuid'
import {TodolistType} from '../App'


type ActionType = {
    type: string
    [key: string]: any
}

export const todolistsReducer = (state: TodolistType[], action: ActionType): TodolistType[] => {

    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id != action.id)
        }

        case 'ADD-TODOLIST': {

            return [...state, {
                id: v1(),
                filter: 'all',
                title: action.title
            }]
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
            throw new Error('I don`t understand this action type')
    }
}