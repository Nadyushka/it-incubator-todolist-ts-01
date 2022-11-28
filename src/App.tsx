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
    const [error, setError] = useState<boolean>(false)


    const removeTask = (taskId: string) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId)
        setTasks(updatedTasks)
        // console.log(updatedTasks)
    }

    const addTask = (newTitleTask: string) => {
        let newTrimedTitle = newTitleTask.trim()
        if (newTrimedTitle) {
            setTasks([{id: v1(), title: newTitleTask, isDone: false}, ...tasks])
        } else {
            setError(true)
        }
    }

    const changeToDoListFilter = (nextFilterValue: FilterValueType) => {
        setFilter(nextFilterValue)
        // console.log(nextFilterValue)
    }

    const getFilteredTask = (tasks: Array<TaskType>, task: FilterValueType): Array<TaskType> => {

        if (filter === "active") {
            return tasks.filter(task => !task.isDone)
        } else if (filter === "completed") {
            return tasks.filter(task => task.isDone)
        }
        return tasks;
    }

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: isDone} : t))
    }

    return (
        <div className="App">
            <ToDoList title={toDoListTitle}
                      tasks={getFilteredTask(tasks, filter)}
                      removeTask={removeTask}
                      changeToDoListFilter={changeToDoListFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
                      filter={filter}
                      error={error}
                      setError={setError}
            />
        </div>
    );
}


export default App;
