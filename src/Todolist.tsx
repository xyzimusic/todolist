import React from 'react';
export type FilterType = 'all' | 'active' | 'completed';
export type TaskType = {
    taskId: number,
    title: string,
    isDone: boolean
}
export type PropsType = {
    title: string,
    tasks: TaskType[],
    students: string[],
    deleteTaskHandler: (taskId: number) => void
    changeFilter: (value: FilterType) => void
}


const Todolist = ({title, tasks, deleteTaskHandler, students, changeFilter}: PropsType) => {
    return (
        <>
            <h1>{title}</h1>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasks.map((item: TaskType) => {
                    return (
                        <li>
                            <input type={"checkbox"} checked={item.isDone}/>
                            <span>{item.title}</span>
                            <button onClick={() => {
                                deleteTaskHandler(item.taskId)
                            }}>x
                            </button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => {
                    changeFilter('all')
                }}>All
                </button>
                <button onClick={() => {
                    changeFilter('active')
                }}>Active
                </button>
                <button onClick={() => {
                    changeFilter('completed')
                }}>Completed
                </button>
            </div>

            <ul>
                {students.map((item: string) => {
                    return (
                        <li>
                            <div>{item}</div>
                        </li>
                    )
                })}
            </ul>
        </>
    );
};

export default Todolist;