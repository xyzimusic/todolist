import Provider from 'react-redux/es/components/Provider'
import {combineReducers, createStore} from 'redux'
import {v1} from 'uuid'
import {TaskPriorities, TaskStatuses} from '../api/todolists-api'
import {AppRootState, store} from '../state/store'
import {tasksReducer} from '../state/tasks-reducer'
import {todolistId1, todolistId2, todolistsReducer} from '../state/todolists-reducer'

const rootReducer = combineReducers(
    {
        todolists: todolistsReducer,
        tasks: tasksReducer,
    }
)
const initialGlobalState = {
    todolists: [
        {id: todolistId1, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
        {id: todolistId2, title: 'What to buy', filter: 'all', order: 0, addedDate: ''}
    ],
    tasks: {
        ['todolistId1']: [
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
        ['todolistId2']: [
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
        ],
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootState)

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={store}>
        {storyFn()}
    </Provider>
}

