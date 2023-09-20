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
    const [todolistId, setTodolistId] = useState<any>('')
    const [state, setState] = useState<any>(null)


    const getTask = () => {

        todolistsAPI.getTasks(todolistId)
            .then((res) => (setState(res.data)))
    }

    return <div>
        <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
            setTodolistId(e.currentTarget.value)
        }}/>
        <button onClick={getTask}>get task</button>
        <div>{JSON.stringify(state)}</div>
    </div>
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
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder={'taskId'} value={taskId} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}/>
            <button onClick={deleteTask}>delete task</button>
        </div>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskTilte, settaskTilte] = useState<any>('')
    const [todolistId, setTodolistId] = useState<any>('')

    const createTask = () => {

        todolistsAPI.createTask(todolistId, taskTilte)
            .then((res) => (setState(res.data)))

    }
    return <div>
        <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
            setTodolistId(e.currentTarget.value)
        }}/>
        <input placeholder={'taskTilte'} value={taskTilte} onChange={(e) => {
            settaskTilte(e.currentTarget.value)
        }}/>
        <button onClick={createTask}>create task</button>
        <div>{JSON.stringify(state)} </div>
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<any>('')
    const [description, setDescription] = useState<any>('')
    const [status,setStatus] = useState<any>(0)
    const [priority,setPriority] = useState<any>(0)
    const [startDate,setStartDate] = useState<any>('')
    const [deadline,setDeadline] = useState<any>('')
    const [todolistId,setTodolistId] = useState<any>('')
    const [taskId,settaskId] = useState<any>('')

    const updateTask = () => {

        console.log(title)
        todolistsAPI.updateTask(todolistId, taskId,{
            deadline: '',
            description,
            priority,
            startDate: '',
            status,
            title,

        } )
            .then((res) => (setState(res.data)))

    }
    return <div>
        <input placeholder={'taskId'} value={taskId} onChange={(e) => {settaskId(e.currentTarget.value)}}/>
        <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {setTodolistId(e.currentTarget.value)}}/>
        t<input placeholder={'title'} value={title} onChange={(e) => {setTitle(e.currentTarget.value)}}/>
        <input placeholder={'description'} value={description} onChange={(e) => {setDescription(e.currentTarget.value)}}/>
        <input placeholder={'status'} value={status} onChange={(e) => {setStatus(e.currentTarget.value)}}/>
        <input placeholder={'priority'} value={priority} onChange={(e) => {setPriority(e.currentTarget.value)}}/>

        <button onClick={updateTask}>update task</button>
        <div>{JSON.stringify(state)} </div>
    </div>
}