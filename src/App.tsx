import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";
import Cars, {TopCarsType} from "./Cars";

export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {

    let [filter, setFilter] = useState<FilterValuesType>('all')
    let [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Redux", isDone: false},
    ])

    const initTopCars = [
        {manufacturer:'BMW', model:'m5cs'},
        {manufacturer:'Mercedes', model:'e63s'},
        {manufacturer:'Audi', model:'rs6'}
    ]
    let [topCars, setTopCars] = useState<TopCarsType[]>(initTopCars)

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
            <Cars topCars ={topCars}/>
        </div>
    );
}

export default App;
