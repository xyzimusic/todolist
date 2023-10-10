import {action} from '@storybook/addon-actions'
import {TaskPriorities, TaskStatuses} from './api/todolists-api'
import {Task} from './Task'

export default {
    title: 'Task Component',
    component: Task,
}

const changeTaskStatusCallback = action('Status changed')
const onChangeTaskTitleCallback = action('Title changed')
const removeTaskCallback = action('Task removed')

export const TaskBaseExample = () => {
    return <>
        <Task task={{
            id: '1',
            status: TaskStatuses.Completed,
            title: 'CSS',
            isDone: true,
            todoListId: 'todolistId1',
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low,
            description: '',
        }}
              removeTask={changeTaskStatusCallback}
              todolistId={'todolistId1'}
              onChangeTaskTitle={onChangeTaskTitleCallback}
              changeTaskStatus={removeTaskCallback}
        />

        <Task task={{
            id: '2',
            status: TaskStatuses.New,
            title: 'JS',
            isDone: true,
            todoListId: 'todolistId1',
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low,
            description: '',
        }}
              removeTask={changeTaskStatusCallback}
              todolistId={'todolistId2'}
              onChangeTaskTitle={onChangeTaskTitleCallback}
              changeTaskStatus={removeTaskCallback}
        />
    </>
}