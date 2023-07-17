import React, {useState} from 'react';
import './App.css';
import  {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import { AddItemForm } from './AddItemForm';

export type FilterValuesType = 'all' | 'completed' | 'active'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export  type TasksStateType = {
    [key:string]:TaskType[]
}

function App() {

    const changeTaskStatus = (tId: string, isDone: boolean, todolistId: string) => {
        //достанем нужный массив по туду
        let tasks = tasksObj[todolistId]
        //найдем нужную таску
        let task: TaskType | undefined = tasks.find((t) => t.id == tId)
        if (task) {
            task.isDone = isDone;
            setTasksObj({...tasksObj})
        }
    }

    const changeTaskTitle = (tId: string, newValue: string, todolistId: string) => {
        let tasks = tasksObj[todolistId]
        let task: TaskType | undefined = tasks.find((t) => t.id == tId)
        if (task) {
            task.title = newValue;
            setTasksObj({...tasksObj})
        }
    }

    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter(item => item.id !== id)
        tasksObj[todolistId] = filteredTasks
        setTasksObj({...tasksObj})
    }

    function changeTodoListTitle(id: string, newTitle: string) {
      const todolist = todolists.find(tl => tl.id ===id)
        if(todolist){
            todolist.title = newTitle
            setTodolists([...todolists])
        }
    }


    const addTask = (newTaskTitle: string, todolistId: string) => {
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
            {id: todolistId1, title: 'What to learn', filter: 'all'},
            {id: todolistId2, title: 'What to buy', filter: 'all'}
        ]
    )

    let [tasksObj, setTasksObj] = useState<TasksStateType>({
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

    let removeTodolist = (todoListId: string) => {
        let filteredTodolist = todolists.filter(tl => tl.id != todoListId)
        setTodolists(filteredTodolist)
        delete tasksObj[todoListId]
        setTasksObj({...tasksObj})
    }

    const addTodoList=(title:string)=>{
        let todolist:TodolistType = {
            id:v1(),
            filter:'all',
            title
        }
        setTodolists([todolist,...todolists])
        setTasksObj({...tasksObj,
        [todolist.id]:[]
        })
    }
    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}></AddItemForm>
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
                            changeTaskStatus={changeTaskStatus}
                            onChangeTaskTitle ={changeTaskTitle}
                            filter={tl.filter}
                            removeTodolist={removeTodolist}
                            changeTodoListTitle={changeTodoListTitle}
                        />
                    )
                })
            }
        </div>
    );
}

export default App;
