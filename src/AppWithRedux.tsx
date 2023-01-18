import React, {useCallback} from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddItemForm from "./AddItemForm";
import {
    AddToDoListAC,
    ChangeToDoListFilterAC,
    ChangeToDoListTitleAC, RemoveToDoListAC,
} from "./store/todoList-reducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "./store/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/state";


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

    const toDoLists = useSelector<AppRootStateType, toDoListType[]>((state) => state.toDoLists)
    const tasks = useSelector<AppRootStateType, TaskStateType>((state) => state.tasks)

    const dispatch = useDispatch()


    const removeTask = useCallback((taskId: string, todolistId: string) => {
            dispatch(RemoveTaskAC(todolistId, taskId))
        }
        , [dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {
            dispatch(AddTaskAC(todolistId, title))
        }
        , [dispatch])

    // const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
    //     dispatch(ChangeTaskStatusAC(todolistId, taskId, isDone))
    // }

    const changeTaskTitle = useCallback((taskId: string, title: string, todolistId: string) => {
            dispatch(ChangeTaskTitleAC(todolistId, taskId, title))
        }
        , [dispatch])

    const changeTaskStatus = useCallback((taskId: string, isDone: boolean, todolistId: string) => {
            dispatch(ChangeTaskStatusAC(todolistId,taskId, isDone))
        }
        , [dispatch])

    const changeTodoListFilter = useCallback((nextFilterValue: FilterValuesType, todolistId: string) => {
            dispatch(ChangeToDoListFilterAC(nextFilterValue, todolistId))
        }
        , [dispatch])

    const changeTodoListTitle = useCallback((title: string, todolistId: string) => {
            dispatch(ChangeToDoListTitleAC(title, todolistId))
        }
        , [dispatch])

    const removeToDoList = useCallback((todolistId: string) => {
            let action = RemoveToDoListAC(todolistId);
            dispatch(action)
        }
        , [dispatch])

    const addToDoList = useCallback((title: string) => {
            let action = AddToDoListAC(title);
            dispatch(action)
        }
        , [dispatch])





    const todolistComponents = toDoLists.map((tl: toDoListType) => {

            return (
                <TodoList
                    id={tl.id}
                    tasks={tasks[tl.id]}
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
