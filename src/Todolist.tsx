import React from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: number) => void
    changeFilter: (id: FilterValuesType) => void
}

const Todolist = ({title, tasks, removeTask, changeFilter}: PropsType) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasks.map((item: TaskType) => {
                    return (
                        <li key={item.id}>
                            <input type="checkbox" checked={item.isDone}/>
                            <span>{item.title}</span>
                            <button onClick={() => {
                                removeTask(item.id)
                            }}>x
                            </button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => {
                    changeFilter('all')
                }}>All
                </button>
                <button onClick={() => {
                    changeFilter('active')
                }}>Active
                </button>
                <button onClick={() => {
                    changeFilter('completed')
                }}>Completed
                </button>
            </div>
        </div>
    );
};

export default Todolist;