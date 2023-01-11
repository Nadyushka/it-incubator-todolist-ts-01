import React, {useState, useReducer, Reducer, Dispatch} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {
    AddToDoListAC,
    ChangeToDoListFilterAC,
    ChangeToDoListTitleAC, RemoveToDoListAC,
} from "./store/todoList-reducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "./store/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, store} from "./store/state";


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

function AppWithRedux() {

    const  toDoLists = useSelector<AppRootStateType,toDoListType[]>((state)=>state.toDoLists)
    const  tasks = useSelector<AppRootStateType,TaskStateType>((state)=>state.tasks)

    const dispatch = useDispatch()



    const removeTask = (taskId: string, todolistId: string) => {
        dispatch(RemoveTaskAC(todolistId, taskId))

    }
    const addTask = (title: string, todolistId: string) => {
        const tasksForUpdate: Array<TaskType> = tasks[todolistId]
        const newTask: TaskType = {id: v1(), title: title, isDone: false}
        // const updatedTasks: Array<TaskType> = [newTask, ...tasksForUpdate]
        // const copyTask = {...tasks}
        //  copyTask[todolistId] = updatedTasks
        dispatch(AddTaskAC(todolistId, title))
        // setTasks({...tasks, [todolistId]: [newTask, ...tasksForUpdate]})
        // setTasks([{id: v1(), title, isDone: false}, ...tasks[todolistId]])
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        // const tasksForUpdate: Array<TaskType> = tasks.todolistId
        // const updatedTasks:Array<TaskType> = tasksForUpdate.map(t => t.id === taskId ? {...t, isDone: isDone} : t)
        // const copyTask = {...tasks}
        //  copyTask[todolistId] = updatedTasks

        // setTasks({
        //     ...tasks,
        //     [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)
        // })

        dispatch(ChangeTaskStatusAC(todolistId, taskId, isDone))

        // setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: isDone} : t))
    }

    const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {

        // setTasks({
        //     ...tasks,
        //     [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title: title} : t)
        // })

        dispatch(ChangeTaskTitleAC(todolistId, taskId, title))

    }

    const changeTodoListFilter = (nextFilterValue: FilterValuesType, todolistId: string) => {
        //setToDoLists(toDoLists.map(tl => tl.id === todolistId ? {...tl, filter: nextFilterValue} : tl))
        dispatch(ChangeToDoListFilterAC(nextFilterValue, todolistId))

    }

    const changeTodoListTitle = (title: string, todolistId: string) => {
        //  setToDoLists(toDoLists.map(tl => tl.id === todolistId ? {...tl, title: title} : tl))
        dispatch(ChangeToDoListTitleAC(title, todolistId))
    }

    const removeToDoList = (todolistId: string) => {
        //  setToDoLists(toDoLists.filter(tl => tl.id !== todolistId))
        // delete tasks[todolistId]
        let action = RemoveToDoListAC(todolistId);
        dispatch(action)

    }

    const addToDoList = (title: string) => {
        // const newToDolistId = v1();
        // const newToDolist: toDoListType = {
        //     id: newToDolistId,
        //     title: title,
        //     filter: 'all'
        // }

        let action = AddToDoListAC(title);

        dispatch(action)

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

export default AppWithRedux;
