import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType, TaskType} from "./App";

type ToDolIstPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeToDoListFilter: (nextFilterValue: FilterValueType) => void
    addTask: (newTitleTask: string) => void
}

const ToDoList = (props: ToDolIstPropsType) => {

    const [newTask, setNewTask] = useState<string>('')

    const addTask = () => {
        props.addTask(newTask)
        setNewTask('')
    }

    const setLocalTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTask(event.currentTarget.value)
    }

    const onEnterAddTask = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTask()
        }
    }

    const taskElements = props.tasks.map((task: TaskType) => {
            const removeTask = () => props.removeTask(task.id)
            return <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={removeTask}>x</button>
            </li>
        }
    )

    const OnClickHandlerCreator = (filter: FilterValueType) => () => props.changeToDoListFilter(filter)


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={newTask}
                    onKeyDown={onEnterAddTask}
                    onChange={setLocalTitle}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {taskElements}
            </ul>
            <div>
                <button onClick={OnClickHandlerCreator('all')}>All</button>
                <button onClick={OnClickHandlerCreator('active')}>Active</button>
                <button onClick={OnClickHandlerCreator('completed')}>Completed</button>
            </div>

        </div>
    );
};

export default ToDoList;