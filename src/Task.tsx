import React, {ChangeEvent, useCallback} from 'react';
import EditableSpan from "./EditableSpan";
import {TaskType} from "./App";

type PropsType = {
    toDolistId: string
    task: TaskType
    removeTask: (taskId: string, toDoListid: string) => void
    changeTaskTitle: (taskId: string, title: string, toDoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void

}


const Task = React.memo((props: PropsType) => {

    console.log('Task')

    const removeTask = () => props.removeTask(props.task.id, props.toDolistId)

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.toDolistId)

    const changeTaskTitle = (title: string) => {
        props.changeTaskTitle(props.task.id, title, props.toDolistId)
    }

    return (
        <li key={props.task.id}>
            <input
                type="checkbox"
                checked={props.task.isDone}
                onChange={changeTaskStatus}
            />
            <span className={props.task.isDone ? "task-done" : ""}>
                            <EditableSpan title={props.task.title} changeTitle={changeTaskTitle}/>
                        </span>
            <button onClick={removeTask}>x</button>
        </li>
    )
})

export default Task;