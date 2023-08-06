import {userReducer} from './user-reducer'

test('user reducer should increment only age', () => {

    const startState = {age: 20, childrenCount: 2, name: 'Dima'}

    const endState = userReducer(startState, {type: 'INCREMENT-AGE'})

    expect(endState.age).toBe(21)
    expect(endState.childrenCount).toBe(2)
});

test('user reducer should increment only childrenCount', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Dima'}

    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'})


    expect(endState.childrenCount).toBe(3)
    expect(endState.age).toBe(20)
})


test('user reducer should change name user', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Dima'}
    const newName = 'Victor'
    const endState = userReducer(startState, {type: 'CHANGE-NAME', newName: newName})


    expect(endState.name).toBe(newName)
})