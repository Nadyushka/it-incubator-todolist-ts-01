import React from 'react';
import {TaskType} from "./App";

type ToDolIstPropsType = {
    title: string,
    tasks: Array<TaskType>,
}

const ToDoList = (props: ToDolIstPropsType) => {

    const taskElements = props.tasks.map((task: TaskType) => {
            return <li>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
            </li>

        }
    )

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {taskElements}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>

        </div>
    );
};

export default ToDoList;