import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    changeFilter: (id: FilterValuesType) => void
    addTask: (newTaskTitle: string) => void
}

const Todolist = (props: PropsType) => {

    let {title, tasks, removeTask, changeFilter, addTask} = props

    const [newTaskTitle, setNewTaskTitle] = useState('')

    const newTaskTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.ctrlKey && event.charCode === 13) {
            addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }

    const addTaskInto = () => {
        addTask(newTaskTitle)
        setNewTaskTitle('')
    }

    const onAllClickHandler = () => changeFilter('all')

    const onActiveClickHandler = () => changeFilter('active')

    const onCompletedClickHandler = () => changeFilter('completed')

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    onChange={newTaskTitleChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    value={newTaskTitle}/>
                <button onClick={addTaskInto}>+
                </button>
            </div>
            <ul>
                {tasks.map((item: TaskType) => {

                    const onRemoveHandler = () => {
                        removeTask(item.id)
                    }

                    return (
                        <li key={item.id}>
                            <input type="checkbox" checked={item.isDone}/>
                            <span>{item.title}</span>
                            <button onClick={onRemoveHandler}>x
                            </button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All
                </button>
                <button onClick={onActiveClickHandler}>Active
                </button>
                <button onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );
};

export default Todolist;