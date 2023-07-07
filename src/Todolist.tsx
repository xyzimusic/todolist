import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    todoListTitle: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    changeFilter: (id: FilterValuesType) => void
    addTask: (newTaskTitle: string) => void
    changeStatus: (tId: string, isDone: boolean) => void
    filter: FilterValuesType
}

const Todolist = (props: PropsType) => {

    let {todoListTitle, tasks, removeTask, changeFilter, addTask} = props

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const newTaskTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.ctrlKey && event.charCode === 13) {
            addTaskInto()
        }
    }

    const addTaskInto = () => {

        if (newTaskTitle.trim() === '') {
            setNewTaskTitle('')
            setError('Title is required!')
            return
        }
        addTask(newTaskTitle.trim())
        setNewTaskTitle('')
    }

    const onAllClickHandler = () => changeFilter('all')

    const onActiveClickHandler = () => changeFilter('active')

    const onCompletedClickHandler = () => changeFilter('completed')


    return (
        <div>
            <h3>{todoListTitle}</h3>
            <div>
                <input
                    className={error ? 'error' : ''}
                    onChange={newTaskTitleChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    value={newTaskTitle}/>
                <button onClick={addTaskInto}>+
                </button>
            </div>
            {error && <div className="error-message">
                Fiield is required
            </div>}
            <ul>
                {tasks.map((item: TaskType) => {

                    const onRemoveHandler = () => {
                        removeTask(item.id)
                    }
                    const onChangeCheckBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        console.log(e.currentTarget.checked)
                        props.changeStatus(item.id, e.currentTarget.checked)
                    }

                    return (
                        <li className = {item.isDone?'is-done':''} key={item.id}>
                            <input
                                onChange={onChangeCheckBoxHandler}
                                type="checkbox"
                                checked={item.isDone}
                            />
                            <span>{item.title}</span>
                            <button onClick={onRemoveHandler}>x
                            </button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={props.filter =='all'? 'active-filter': ''} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter =='active'? 'active-filter': ''} onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter =='completed'? 'active-filter': ''} onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );
};

export default Todolist;