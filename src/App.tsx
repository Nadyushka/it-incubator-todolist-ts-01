import React, {useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

export type FilterValueType = "all" | "active" | "completed"

function App() {
    const toDoListTitle: string = "What to learn"

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "REACT", isDone: false}
    ])

    const [filter, setFilter] = useState<FilterValueType>('all')

    const removeTask = (taskId: number) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId)
        setTasks(updatedTasks)
        console.log(updatedTasks)
    }

    const changeToDoListFilter = (nextFilterValue: FilterValueType) => {
        setFilter(nextFilterValue)
        console.log(nextFilterValue)
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
                />
            </div>
        );
    }


export default App;
