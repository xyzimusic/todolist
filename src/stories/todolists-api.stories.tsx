import React, {useEffect, useState} from 'react'
import {todolistsAPI} from '../api/todolists-api'

export default {
    title: 'API'
}

const options = {
    withCredentials: true
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((res) => (setState(res.data)))

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.createTodolist('NEW TODOLIST')
            .then((res) => (setState(res.data)))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = `13bf906d-7673-4c98-b348-e51557a047ec`
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => (setState(res.data)))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const todolistId = `13bf906d-7673-4c98-b348-e51557a047ec`
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '73a3c33c-8078-42fd-b943-a53d908164dd'
        todolistsAPI.updateTodolistTitle(todolistId, 'KEK66')
            .then((res) => (setState(res.data)))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '82b88a74-d861-43ec-92f3-7af157357ab5'
        todolistsAPI.getTasks(todolistId)
            .then((res) => (setState(res.data)))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {

    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>('')
    const [todolistId, setTodolistId] = useState<any>('')


    const deleteTask = () => {

        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res) => (setState(res.data)))

    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e)=>{
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder={'taskId'} value ={taskId} onChange={(e)=>{
                setTaskId(e.currentTarget.value)
            }}/>
            <button onClick={deleteTask}>delete task</button>
        </div>
    </div>
}