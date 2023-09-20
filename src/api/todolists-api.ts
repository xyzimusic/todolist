import axios from 'axios'

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponsiveType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetTYpeResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true
})

export type UpdateTaskType = {
    deadline: string
    description: string
    priority:number
    startDate:string
    status: number
    title: string
}
export const todolistsAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>(`/todo-lists`)
    },
    createTodolist(title: string) {
        return axios.post<ResponsiveType<{
            item: TodolistType
        }>>(`todo-lists`, {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponsiveType>(`/todo-lists/${todolistId}`)
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<ResponsiveType>(`/todo-lists/${todolistId}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTYpeResponse>(`/todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponsiveType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId: string, taskTitle: string) {
        return instance.post<ResponsiveType<{item: TodolistType }>>(`/todo-lists/${todolistId}/tasks`, {title:taskTitle})
    },
    updateTask(todolistId: string, taskId: string, model:UpdateTaskType) {
        return instance.put<ResponsiveType>(`/todo-lists/${todolistId}/tasks/${taskId}`,model)
    },

}