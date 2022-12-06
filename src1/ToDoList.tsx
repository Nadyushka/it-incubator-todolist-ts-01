import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType, TaskType} from "./App";
import './App.css';
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

type ToDolIstPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeToDoListFilter: (nextFilterValue: FilterValueType) => void
    addTask: (newTitleTask: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValueType
    error: boolean
    setError: (value: boolean) => void
}

const ToDoList = (props: ToDolIstPropsType) => {

    const [newTask, setNewTask] = useState<string>('')

    const addTask = () => {
        props.addTask(newTask)
        setNewTask('')
    }

    const setLocalTitle = (event: ChangeEvent<HTMLInputElement>) => {
        error && props.setError(false)
        setNewTask(event.currentTarget.value)
    }

    const onEnterAddTask = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTask()
        }
    }

    const taskElements = props.tasks.length !== 0 ? props.tasks.map((task: TaskType) => {

        const removeTask = () => props.removeTask(task.id)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked)

        return <li key={task.id} className={task.isDone === true ? 'task-done' : ''}>
            <input type="checkbox"
                   checked={task.isDone}
                   onChange={changeTaskStatus}
            />
            <span>{task.title}</span>
            <button onClick={removeTask}>x</button>
        </li>
    }) : <li>Add your list</li>;

    const OnClickHandlerCreator = (filter: FilterValueType) => () => props.changeToDoListFilter(filter)


    return (
        <div>

            <h3>{props.title}</h3>
            <div>
                <input
                    value={newTask}
                    onKeyDown={onEnterAddTask}
                    onChange={setLocalTitle}
                    className={props.error == true ? 'input-error' : ''}
                />

                <button onClick={addTask}>+</button>
                {props.error && <div style={{color:'red', fontWeight:600}}>Add correct task</div>}
            </div>
            <ul>
                {taskElements}

            </ul>
            <div>
                <button className={props.filter === "all" ? 'btn-color' : ''}
                        onClick={OnClickHandlerCreator('all')}>All
                </button>
                <button className={props.filter === "active" ? 'btn-color' : ''}
                        onClick={OnClickHandlerCreator('active')}>Active
                </button>
                <button className={props.filter === "completed" ? 'btn-color' : ''}
                        onClick={OnClickHandlerCreator('completed')}>Completed
                </button>
            </div>

        </div>
    )
};

export default ToDoList;