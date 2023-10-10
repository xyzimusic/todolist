import {useState} from 'react';
import {v1} from 'uuid';
import {TodolistType} from '../../api/todolists-api';
import {FilterValuesType, TodolistDomainType} from '../../state/todolists-reducer';
import {todolistId1, todolistId2} from '../id-utils';

export function useTodolists(
    onTodolistsRemoved: (id: string) => void,
    onTodolistsAdded: (id: string) => void,
) {

    let [todolists, setTodolists] = useState<TodolistDomainType[]>([
            {id: todolistId1, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
            {id: todolistId2, title: 'What to buy', filter: 'all', order: 0, addedDate: ''}
        ]
    )

    function changeFilter(value: FilterValuesType, todoListId: string) {
        let todolist = todolists.find((tl) => tl.id === todoListId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    let removeTodolist = (todoListId: string) => {
        let filteredTodolist = todolists.filter(tl => tl.id != todoListId)
        setTodolists(filteredTodolist)
        onTodolistsRemoved(todoListId)
    }

    function changeTodoListTitle(id: string, newTitle: string) {
        const todolist = todolists.find(tl => tl.id === id)
        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }
    }

    const addTodoList = (title: string) => {
        const newTodolistId = v1()
        let todolist: TodolistDomainType = {
            id: newTodolistId,
            filter: 'all',
            title,
            order:0,
            addedDate:''
        }
        setTodolists([todolist, ...todolists])
        onTodolistsAdded(newTodolistId)
    }

    return {
        todolists,
        setTodolists,
        changeFilter,
        removeTodolist,
        changeTodoListTitle,
        addTodoList
    }
}