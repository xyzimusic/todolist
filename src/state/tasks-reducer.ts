import {v1} from 'uuid'
import {TaskPriorities, TaskStatuses} from '../api/todolists-api'
import {TasksStateType} from '../App/App'
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
    status: TaskStatuses
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

export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todoListId: string): ChangeTaskStatusActionType => {
    return {
        type: 'CHANGE-TASK-STATUS',
        status,
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

const initialState: TasksStateType = {
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
}
export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {

    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].filter((el: { id: string }) => el.id != action.taskId)
            }
        }

        case 'CHANGE-TASK-STATUS': {
            console.log('CHANGE-TASK-STATUS')
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(task => task.id === action.taskId ? {
                    ...task,
                    status: action.status
                } : task)
            }
        }

        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(task => task.id === action.taskId ? {
                    ...task,
                    title: action.title
                } : task)
            }
        }

        case 'ADD-TASK': {
            let task = {
                id: v1(),
                title: action.title,
                status: TaskStatuses.New,
                isDone: true,
                todoListId: action.todolistId,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
            }
            return {...state, [action.todolistId]: [task, ...state[action.todolistId]]}
        }

        case 'ADD-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }

        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }

        default:
            return state
    }
}