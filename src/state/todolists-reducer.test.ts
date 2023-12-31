import {v1} from 'uuid'
import {
    addTodolistAC,
    ChangeTodolistFilterActionType,
    changeTodolistTitleAC,
    FilterValuesType,
    removeTodolistAC,
    TodolistDomainType,
    todolistsReducer
} from './todolists-reducer'

test('correct todolist should be removed', () => {

    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistDomainType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
        {id: todolistId2, title: 'What to buy', filter: 'all', order: 0, addedDate: ''}
    ]

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})
test('correct todolist should be added', () => {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodoListTitle = 'New TodoList'

    const startState: TodolistDomainType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
        {id: todolistId2, title: 'What to buy', filter: 'all', order: 0, addedDate: ''}
    ]

    const endState = todolistsReducer(startState, addTodolistAC(newTodoListTitle))
    console.log(endState)
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodoListTitle)
    expect(endState[2].filter).toBe('all')
})


test('correct todolist title should be changed', () => {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodoListTitle = 'New TodoList'

    const startState: TodolistDomainType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
        {id: todolistId2, title: 'What to buy', filter: 'all', order: 0, addedDate: ''}
    ]

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, newTodoListTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodoListTitle)
})


test('correct todolist filter should be changed', () => {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let newFilter: FilterValuesType = 'completed'

    const startState: TodolistDomainType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
        {id: todolistId2, title: 'What to buy', filter: 'all', order: 0, addedDate: ''}
    ]

    const action: ChangeTodolistFilterActionType = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId2,
        filter: newFilter
    }

    const endState = todolistsReducer(startState, action)
    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})



