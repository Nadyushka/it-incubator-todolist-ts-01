import React, {useState, useReducer, Reducer} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import toDoList from "../src1/ToDoList";
import ToDoList from "../src1/ToDoList";
import AddItemForm from "./AddItemForm";
import {toDolistsReducer, toDolistsReducerActionTypes} from "./store/todoList-reducer";
import {taskReducer} from "./store/task-reducer";


//C - create (validation)
//R - read (pagination, sorting, filtration)
//U - update (validation)
//D - delete (validation)

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type toDoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [toDoListId: string]: Array<TaskType>
}

export type FilterValuesType = "all" | "active" | "completed"

function AppWithReducer() {

    const id_1 = v1();
    const id_2 = v1();

    const [toDoLists, dispatchToDoLists] = useReducer<Reducer<toDoListType[], toDolistsReducerActionTypes>>(toDolistsReducer,
        [
            {id: id_1, title: "What to learn", filter: 'all'},
            {id: id_2, title: "What to buy", filter: 'all'}
        ]
    )

    const [tasks, dispatchTasks] = useReducer(taskReducer,
        {
        [id_1]: [
            {id: v1(), title: "HTML & CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false}
        ],
        [id_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Meat", isDone: true},
            {id: v1(), title: "Wheat", isDone: false}
        ]
    })


    const removeTask = (taskId: string, todolistId: string) => {

        // const tasksForUpdate: Array<TaskType> = tasks.todolistId
        // const copy = [...tasksForUpdate]
        // const updatedTasks: Array<TaskType> = copy.filter(task => task.id !== taskId)
        // const copyTask = {...tasks}
        // copyTask[todolistId] = updatedTasks
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)})

        // const updatedTasks = tasks.filter(task => task.id !== taskId)
        // setTasks(updatedTasks)
        // console.log(tasks)
    }
    const addTask = (title: string, todolistId: string) => {
        const tasksForUpdate: Array<TaskType> = tasks[todolistId]
        const newTask: TaskType = {id: v1(), title: title, isDone: false}
        // const updatedTasks: Array<TaskType> = [newTask, ...tasksForUpdate]
        // const copyTask = {...tasks}
        //  copyTask[todolistId] = updatedTasks

        setTasks({...tasks, [todolistId]: [newTask, ...tasksForUpdate]})
        // setTasks([{id: v1(), title, isDone: false}, ...tasks[todolistId]])
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        // const tasksForUpdate: Array<TaskType> = tasks.todolistId
        // const updatedTasks:Array<TaskType> = tasksForUpdate.map(t => t.id === taskId ? {...t, isDone: isDone} : t)
        // const copyTask = {...tasks}
        //  copyTask[todolistId] = updatedTasks

        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)
        })


        // setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: isDone} : t))
    }

    const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {

        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title: title} : t)
        })

    }

    const changeTodoListFilter = (nextFilterValue: FilterValuesType, todolistId: string) => {
        setToDoLists(toDoLists.map(tl => tl.id === todolistId ? {...tl, filter: nextFilterValue} : tl))
    }

    const changeTodoListTitle = (title: string, todolistId: string) => {
        setToDoLists(toDoLists.map(tl => tl.id === todolistId ? {...tl, title: title} : tl))
    }

    const removeToDoList = (todolistId: string) => {
        setToDoLists(toDoLists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
    }

    const getFilteredTasks =
        (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
            switch (filter) {
                case "completed":
                    return tasks.filter(task => task.isDone)
                case "active":
                    return tasks.filter(task => !task.isDone)
                default:
                    return tasks
            }
        }

    const addToDoList = (title: string) => {
        const newToDolistId = v1();
        const newToDolist: toDoListType = {
            id: newToDolistId,
            title: title,
            filter: 'all'
        }
        setToDoLists([...toDoLists, newToDolist])
        setTasks({...tasks, [newToDolistId]: []})
    }


    const todolistComponents = toDoLists.map((tl: toDoListType) => {
            const filteredTasks = getFilteredTasks(tasks[tl.id], tl.filter)
            return (
                <TodoList
                    id={tl.id}
                    tasks={filteredTasks}
                    title={tl.title}
                    filter={tl.filter}
                    addTask={addTask}
                    removeTask={removeTask}
                    changeTaskStatus={changeTaskStatus}
                    changeTodoListFilter={changeTodoListFilter}
                    removeToDoList={removeToDoList}
                    changeTaskTitle={changeTaskTitle}
                    changeTodoListTitle={changeTodoListTitle}
                />)
        }
    )


    return (
        <div className="App">
            <AddItemForm addItem={addToDoList}/>
            {todolistComponents}
        </div>
    );
}

export default AppWithReducer;
