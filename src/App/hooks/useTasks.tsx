import {useState} from 'react';
import { v1 } from 'uuid';
import { TaskType } from '../../Todolist';
import {TasksStateType} from '../App';
import { todolistId1, todolistId2 } from '../id-utils';

export function useTasks() {

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


    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter(item => item.id !== id)
        tasksObj[todolistId] = filteredTasks
        setTasksObj({...tasksObj})
    }

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

    function completlyRemoveTasksForTodolist(todoListId:string){
        delete tasksObj[todoListId]
        setTasksObj({...tasksObj})
    }

    function addStateForNewTodolist(id:string){
        setTasksObj({
                ...tasksObj,
                [id]: []
            })
    }

    return {
        tasksObj,
        setTasksObj,
        removeTask,
        changeTaskStatus,
        addTask,
        changeTaskTitle,
        completlyRemoveTasksForTodolist,
        addStateForNewTodolist
    }

}