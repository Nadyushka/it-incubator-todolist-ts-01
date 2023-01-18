import React, {useCallback} from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddItemForm from "./AddItemForm";
import {
    AddToDoListAC,
    ChangeToDoListFilterAC,
    ChangeToDoListTitleAC, RemoveToDoListAC,
} from "./store/todoList-reducer";
import {AddTaskAC, ChangeTaskTitleAC, RemoveTaskAC} from "./store/task-reducer";
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


    const removeTask = (taskId: string, todolistId: string) => {
        dispatch(RemoveTaskAC(todolistId, taskId))
    }

    const addTask = useCallback((title: string, todolistId: string) => {
            dispatch(AddTaskAC(todolistId, title))
        }
        , [dispatch])
    // const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
    //     dispatch(ChangeTaskStatusAC(todolistId, taskId, isDone))
    // }

    const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
        dispatch(ChangeTaskTitleAC(todolistId, taskId, title))
    }

    const changeTodoListFilter = (nextFilterValue: FilterValuesType, todolistId: string) => {
        dispatch(ChangeToDoListFilterAC(nextFilterValue, todolistId))
    }

    const changeTodoListTitle = (title: string, todolistId: string) => {
        dispatch(ChangeToDoListTitleAC(title, todolistId))
    }

    const removeToDoList = (todolistId: string) => {
        let action = RemoveToDoListAC(todolistId);
        dispatch(action)
    }

    const addToDoList = (title: string) => {
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
