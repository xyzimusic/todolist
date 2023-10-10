import {useState} from 'react';
import {v1} from 'uuid';
import {TaskPriorities, TaskStatuses, TaskType} from '../../api/todolists-api';
import {TasksStateType} from '../App';
import {todolistId1, todolistId2} from '../id-utils';

export function useTasks() {

    let [tasksObj, setTasksObj] = useState<TasksStateType>({
        [todolistId1]: [
            {
                id: v1(),
                title: 'HTML&CSS',
                status: TaskStatuses.Completed,
                isDone: true,
                todoListId: todolistId1,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
            },
            {
                id: v1(),
                title: 'JS',
                status: TaskStatuses.Completed,
                isDone: true,
                todoListId: todolistId1,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
            },
            {
                id: v1(),
                title: 'ReactJS',
                status: TaskStatuses.New,
                isDone: true,
                todoListId: todolistId1,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
            },
            {
                id: v1(),
                title: 'Redux',
                status: TaskStatuses.New,
                isDone: true,
                todoListId: todolistId1,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
            },
        ],
        [todolistId2]: [
            {
                id: v1(),
                title: 'Book',
                status: TaskStatuses.New,
                isDone: true,
                todoListId: todolistId2,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
            },
            {
                id: v1(),
                title: 'Book',
                status: TaskStatuses.Completed,
                isDone: true,
                todoListId: todolistId2,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
            },
        ]
    })


    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter(item => item.id !== id)
        tasksObj[todolistId] = filteredTasks
        setTasksObj({...tasksObj})
    }

    const changeTaskStatus = (tId: string, status: TaskStatuses, todolistId: string) => {
        console.log(`changeTaskStatus`)
        //достанем нужный массив по туду
        let tasks = tasksObj[todolistId]
        //найдем нужную таску
        let task: TaskType | undefined = tasks.find((t) => t.id == tId)
        if (task) {
            task.status = status;
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

    const addTask = (newTaskTitle: string, todoListId: string) => {
        let task:TaskType = {
            id: v1(),
            title: newTaskTitle,
            isDone: false,
            status: TaskStatuses.New,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low,
            description: '',
            todoListId,
        }
        let tasks = tasksObj[todoListId]
        let newTasks = [task, ...tasks]
        tasksObj[todoListId] = newTasks
        setTasksObj({...tasksObj})
    }

    function completlyRemoveTasksForTodolist(todoListId: string) {
        delete tasksObj[todoListId]
        setTasksObj({...tasksObj})
    }

    function addStateForNewTodolist(id: string) {
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