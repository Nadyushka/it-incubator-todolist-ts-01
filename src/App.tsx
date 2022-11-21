import React, {useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {v1} from "uuid";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export type FilterValueType = "all" | "active" | "completed"

function App() {
    // console.log(v1())

    const toDoListTitle: string = "What to learn"

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "REACT", isDone: false}
    ])

    const [filter, setFilter] = useState<FilterValueType>('all')

    const removeTask = (taskId: string) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId)
        setTasks(updatedTasks)
        // console.log(updatedTasks)
    }

    const addTask = (newTitleTask:string) => {
        const newTask: TaskType = {id: v1(), title: newTitleTask, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const changeToDoListFilter = (nextFilterValue: FilterValueType) => {
        setFilter(nextFilterValue)
        // console.log(nextFilterValue)
    }

    let tasksForRender: Array<TaskType> = [];
    if (filter === "all") {
        tasksForRender = tasks;
    } else if (filter === "active") {
        tasksForRender = tasks.filter(task => task.isDone === false)
    } else if (filter === "completed") {
        tasksForRender = tasks.filter(task => task.isDone === true)
    }

    return (
        <div className="App">
            <ToDoList title={toDoListTitle}
                      tasks={tasksForRender}
                      removeTask={removeTask}
                      changeToDoListFilter={changeToDoListFilter}
                      addTask = {addTask}
            />
        </div>
    );
}


export default App;
