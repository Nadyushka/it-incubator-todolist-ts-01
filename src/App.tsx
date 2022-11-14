import React, {useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}


function App() {
    const toDoListTitle_1:string = "What to learn"

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "REACT", isDone: false}
    ])
    
    const removeTask = (taskId:number) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId)
       setTasks(updatedTasks)
        console.log(updatedTasks)
    }

    return (
        <div className="App">
            <ToDoList title={toDoListTitle_1}
                      tasks={tasks}
                      removeTask={removeTask}/>
        </div>
    );
}

export default App;
