import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {

    let [filter, setFilter] = useState<FilterValuesType>('all')
    let [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
    ])
    const changeStatus = (tId: string, isDone: boolean) => {
        let task: TaskType | undefined = tasks.find((t) => t.id == tId)
        if (task) {
            task.isDone = isDone;
        }
        setTasks([...tasks])
    }

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(item => item.id !== id)
        setTasks(filteredTasks)
    }

    let tasksForTodoList = tasks;

    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone)
    }
    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    }

    const addTask = (newTaskTitle: string) => {
        let newTask1 = {
            id: v1(),
            title: newTaskTitle,
            isDone: false
        }

        setTasks([...tasks, newTask1])
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    return (
        <div className="App">
            <Todolist todoListTitle="What to learn"
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeStatus={changeStatus}
                      filter={filter}
            />
        </div>
    );
}

export default App;
