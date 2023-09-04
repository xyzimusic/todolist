import Provider from 'react-redux/es/components/Provider'
import {combineReducers, createStore} from 'redux'
import {v1} from 'uuid'
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
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML&&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'React book', isDone: true},
        ],
    }
}

// @ts-ignore
export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootState)

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={store}>
        {storyFn()}
    </Provider>
}

