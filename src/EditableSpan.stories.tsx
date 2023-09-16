
import {action} from '@storybook/addon-actions'
import { AddItemForm } from './AddItemForm/AddItemForm';
import {EditableSpan} from './EditableSpan';

export default {
    title: 'EditableSpan Component',
    component: AddItemForm,
}

const onChangeCallback = action('value changed')

export const EditableSpanBaseExample = () => {
    return <EditableSpan title ={'Start value'} onChange={onChangeCallback}/>
}