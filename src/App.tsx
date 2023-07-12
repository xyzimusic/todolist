import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'completed' | 'active'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    const changeStatus = (tId: string, isDone: boolean, todolistId:string) => {
        let tasks = tasksObj[todolistId]
        let task: TaskType | undefined = tasks.find((t) => t.id == tId)
        if (task) {
            task.isDone = isDone;
            setTasksObj({...tasksObj})
        }
    }

    function removeTask(id: string, todolistId:string) {
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter(item => item.id !== id)
        tasksObj[todolistId] = filteredTasks
        setTasksObj({...tasksObj})
    }


    const addTask = (newTaskTitle: string,todolistId:string) => {
        let task = {
            id: v1(),
            title: newTaskTitle,
            isDone: false
        }
        let tasks = tasksObj[todolistId]
        let newTasks = [task, ...tasks]
        tasksObj[todolistId] = newTasks
        setTasksObj({...tasksObj})
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        let todolist = todolists.find((tl) => tl.id === todoListId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }

    }

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>([
            {id: todolistId1, title: 'What to learn', filter: 'active'},
            {id: todolistId2, title: 'What to buy', filter: 'completed'}
        ]
    )

    let [tasksObj, setTasksObj] = useState({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Book', isDone: false},
            {id: v1(), title: 'Milk', isDone: true},
        ]
    })

    let removeTodolist = (todoListId:string)=>{
        let filteredTodolist = todolists.filter(tl=>tl.id != todoListId)
        setTodolists(filteredTodolist)
        delete tasksObj[todoListId]
        setTasksObj({...tasksObj})
    }

    return (
        <div className="App">
            {
                todolists.map((tl) => {

                    let tasksForTodoList = tasksObj[tl.id];

                    if (tl.filter === 'completed') {
                        tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
                    }
                    if (tl.filter === 'active') {
                        tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
                    }

                    return (
                        <Todolist
                            key={tl.id}
                            id={tl.id}
                            todoListTitle={tl.title}
                            tasks={tasksForTodoList}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeStatus={changeStatus}
                            filter={tl.filter}
                            removeTodolist={removeTodolist}
                        />
                    )
                })
            }
        </div>
    );
}

export default App;
