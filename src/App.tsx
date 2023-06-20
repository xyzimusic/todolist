import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";

export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {

    let [filter, setFilter] = useState<FilterValuesType>('all')
    let [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Redux", isDone: false},
    ])

    function removeTask(id: number) {
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

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    return (
        <div className="App">
            <Todolist title='What to learn'
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
