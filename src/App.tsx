import React from 'react';
import './App.css';
import ToDoList from "./ToDoList";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

function App() {
    const toDoListTitle_1:string = "What to learn"
    const toDoListTitle_2:string = "What to buy"
    const tasks_1:Array<TaskType> = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "REACT", isDone: false}]
    const tasks_2:Array<TaskType> = [
        {id: 4, title: "Beer", isDone: true},
        {id: 5, title: "Milk", isDone: false},
        {id: 6, title: "Cola", isDone: false}]

    return (
        <div className="App">
            <ToDoList title={toDoListTitle_1} tasks={tasks_1}/>
        </div>
    );
}

export default App;
