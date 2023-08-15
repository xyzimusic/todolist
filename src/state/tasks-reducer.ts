import {v1} from 'uuid'
import {TasksStateType} from '../App'
import {AddTodolistActionType, RemoveTodolistActionType, todolistId1, todolistId2} from './todolists-reducer'


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todoListId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string,
    isDone: boolean
    todoListId: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string,
    title: string
    todoListId: string
}

export type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
export const removeTaskAC = (taskId: string, todoListId: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE-TASK',
        todoListId,
        taskId
    }
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {
        type: 'ADD-TASK',
        title,
        todolistId
    }
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string): ChangeTaskStatusActionType => {
    return {
        type: 'CHANGE-TASK-STATUS',
        isDone,
        taskId,
        todoListId
    }
}

export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string): ChangeTaskTitleActionType => {
    return {
        type: 'CHANGE-TASK-TITLE',
        title,
        taskId,
        todoListId
    }
}

const initialState:TasksStateType = {
    [todolistId1]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
    ],
    [todolistId2]: [
        {id: v1(), title: 'Book', isDone: false},
        {id: v1(), title: 'Milk', isDone: true},
    ]
}
export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {

    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = state[action.todoListId]
            const filteredTasks = tasks.filter(el => el.id != action.taskId)
            stateCopy[action.todoListId] = filteredTasks
            return stateCopy;
        }

        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state}
            let tasks = state[action.todoListId]
            //найдем нужную таску
            let task = tasks.find((t) => t.id == action.taskId)
            if (task) {
                task.isDone = action.isDone;

            }
            return stateCopy
        }

        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state}
            let tasks = state[action.todoListId]
            //найдем нужную таску
            let task = tasks.find((t) => t.id == action.taskId)
            if (task) {
                task.title = action.title;

            }
            return stateCopy
        }

        case 'ADD-TASK': {
            let task = {
                id: v1(),
                title: action.title,
                isDone: false
            }

            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const newTasks = [task, ...tasks]
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }

        case 'ADD-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }

        case 'REMOVE-TODOLIST':{
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }

        default:
            return state
    }
}