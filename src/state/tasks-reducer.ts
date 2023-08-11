import {v1} from 'uuid'
import {FilterValuesType, TasksStateType, TodolistType} from '../App'


export type RemoveTaskType = {
    type: 'REMOVE-TASK'
    todoListId: string,
    taskId:string
}

export type Action2Type = {
    type: '1'
    id: string
}

export type ActionType = RemoveTaskType | Action2Type
export const removeTaskAC = (taskId:string, todoListId: string): RemoveTaskType => {
    return {
        type: 'REMOVE-TASK',
        todoListId,
        taskId
    }
}

export const action2AC = (todolistId: string): Action2Type => {
    return {
        type: '1',
        id: todolistId
    }
}
export const tasksReducer = (state: TasksStateType, action: ActionType):TasksStateType  => {

    switch (action.type) {
        case 'REMOVE-TASK': {

            const stateCopy = {...state}
            const tasks = state[action.todoListId]
            const filteredTasks = tasks.filter(el=>el.id!=action.taskId)
            stateCopy[action.todoListId] = filteredTasks
            return stateCopy;
        }

        case '1': {
            return {...state}

        }

        default:
            throw new Error('I don`t understand this action type')
    }
}