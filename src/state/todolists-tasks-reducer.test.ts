import {TaskPriorities, TaskStatuses } from '../api/todolists-api';
import {TasksStateType} from '../App/App';
import {tasksReducer} from './tasks-reducer'
import {addTodolistAC, removeTodolistAC, TodolistDomainType, todolistsReducer} from './todolists-reducer'

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: TodolistDomainType[] = []

    const action = addTodolistAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFormTasks = keys[0]
    const idFormTodolists = endTodolistsState[0].id

    expect(idFormTasks).toBe(idFormTodolists);
    expect(idFormTasks).toBe(action.todolistId);
    expect(idFormTodolists).toBe(action.todolistId)
});


test('property with todolistId should be deleted', () => {

    const startState: TasksStateType = {
        'todolistId1': [
            {
                id: '1',
                title: 'CSS',
                status: TaskStatuses.New,
                isDone: true,
                todoListId: 'todolistId1',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatuses.Completed,
                isDone: true,
                todoListId: 'todolistId1',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
            },
            {
                id: '3',
                title: 'React',
                status: TaskStatuses.New,
                isDone: true,
                todoListId: 'todolistId1',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
            },
        ],
        'todolistId2': [
            {
                id: '1',
                title: 'bread',
                status: TaskStatuses.New,
                isDone: true,
                todoListId: 'todolistId2',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
            },
            {
                id: '2',
                title: 'milk',
                status: TaskStatuses.Completed,
                isDone: true,
                todoListId: 'todolistId2',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
            },
            {
                id: '3',
                title: 'tea',
                status: TaskStatuses.New,
                isDone: true,
                todoListId: 'todolistId2',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
            },
        ],
    };

    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)

    expect(endState['todolistId2']).toBeUndefined()
});