import React, {useState} from 'react';
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
                <input
                    value={newTask}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            setNewTask(event.currentTarget.value)
                        }
                    }}
                    onChange={(event) => setNewTask(event.currentTarget.value)}/>
                <button onClick={() => {
                    props.addTask(newTask)
                    setNewTask('')
                }}>+
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