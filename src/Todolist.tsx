import React, {ChangeEvent, useState} from 'react';
import {AddItemForm} from './AddItemForm';
import {FilterValuesType} from './App';
import { EditableSpan } from './EditableSpan';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    id: string
    todoListTitle: string
    tasks: TaskType[]
    removeTask: (id: string, todoListId: string) => void
    changeFilter: (id: FilterValuesType, todoListId: string) => void
    addTask: (newTaskTitle: string, todoListId: string) => void
    changeTaskStatus: (tId: string, isDone: boolean, todoListId: string) => void
    onChangeTaskTitle: (tId: string, newTitle: string, todoListId: string) => void
    filter: FilterValuesType
    removeTodolist: (id: string) => void
    changeTodoListTitle: (id: string, newTitle:string) => void

}

export const Todolist = (props: PropsType) => {

    let {todoListTitle, tasks, removeTask, changeFilter, addTask} = props

    const [newTaskTitle, setNewTaskTitle] = useState('')


    const onAllClickHandler = () => changeFilter('all', props.id)

    const onActiveClickHandler = () => changeFilter('active', props.id)

    const onCompletedClickHandler = () => changeFilter('completed', props.id)

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const addTaskHandler = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }
    return (
        <div>
            <h3>
                <EditableSpan onChange={changeTodoListTitle} title={todoListTitle}></EditableSpan>
                <button onClick={removeTodolist}>x</button>
            </h3>
            <AddItemForm addItem={addTaskHandler}></AddItemForm>
            <ul>
                {tasks.map((item: TaskType) => {

                    const onRemoveHandler = () => {
                        removeTask(item.id, props.id)
                    }
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        console.log(e.currentTarget.checked)
                        props.changeTaskStatus(item.id, e.currentTarget.checked, props.id)
                    }

                    const onChangeTitleHandler = (newValue:string) => {
                        props.onChangeTaskTitle(item.id,newValue, props.id)
                    }


                    return (
                        <li className={item.isDone ? 'is-done' : ''} key={item.id}>
                            <input
                                onChange={onChangeStatusHandler}
                                type="checkbox"
                                checked={item.isDone}
                            />
                            <EditableSpan title={item.title} onChange={onChangeTitleHandler}></EditableSpan>
                            <button onClick={onRemoveHandler}>x
                            </button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={props.filter == 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter == 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter == 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );
};

