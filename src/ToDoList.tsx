import React from 'react';
import {FilterValueType, TaskType} from "./App";

type ToDolIstPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeToDoListFilter: (nextFilterValue: FilterValueType) => void
    addTask: (newTitleTask:string)=> void
}

const ToDoList = (props: ToDolIstPropsType) => {

    const taskElements = props.tasks.map((task: TaskType) => {
            return <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={() => props.removeTask(task.id)}>x</button>
            </li>
        }
    )

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button onClick={() => {props.addTask('Angular')}}>+
                </button>
            </div>
            <ul>
                {taskElements}
            </ul>
            <div>
                <button onClick={() => props.changeToDoListFilter('all')}>All</button>
                <button onClick={() => props.changeToDoListFilter('active')}>Active</button>
                <button onClick={() => props.changeToDoListFilter('completed')}>Completed</button>
            </div>

        </div>
    );
};

export default ToDoList;