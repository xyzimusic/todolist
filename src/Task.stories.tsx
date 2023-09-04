import {action} from '@storybook/addon-actions'
import { Task } from './Task'

export default {
    title: 'Task Component',
    component: Task,

}

const changeTaskStatusCallback = action('Status changed')
const onChangeTaskTitleCallback = action('Title changed')
const removeTaskCallback = action('Task removed')


export const TaskBaseExample = () => {
    return <>
        <Task task={{id:'1',isDone:true, title:'CSS'}}
              removeTask={changeTaskStatusCallback}
              todolistId={'todolistId1'}
              onChangeTaskTitle={onChangeTaskTitleCallback}
              changeTaskStatus={removeTaskCallback}
        />

        <Task task={{id:'2',isDone:false, title:'JS'}}
              removeTask={changeTaskStatusCallback}
              todolistId={'todolistId2'}
              onChangeTaskTitle={onChangeTaskTitleCallback}
              changeTaskStatus={removeTaskCallback}
        />
    </>
}