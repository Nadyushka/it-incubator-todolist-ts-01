import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from './AddItemForm';
import EditableSpan from "./EditableSpan";
import {ChangeTaskStatusAC} from "./store/task-reducer";
import {useDispatch} from "react-redux";
import Task from "./Task";


//rsc
// typescript =>
// 1. Variable
// 2. Param of func
// 3. Return of func

type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeTodoListFilter: (nextFilterValue: FilterValuesType, todolistId: string) => void
    removeToDoList: (todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
    changeTodoListTitle: (title: string, todolistId: string) => void
}

const TodoList = React.memo((props: TodoListPropsType) => {

    console.log('TodoList')

    const getFilteredTasks = (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
        switch (filter) {
            case "completed":
                return tasks.filter(task => task.isDone)
            case "active":
                return tasks.filter(task => !task.isDone)
            default:
                return tasks
        }
    }

    let tasks = getFilteredTasks(props.tasks, props.filter)

    const tasksListItems = props.tasks.length
        ? <ul>{

            tasks.map((task) =>
                <Task
                    toDolistId={props.id}
                    task={task}
                    changeTaskTitle={props.changeTaskTitle}
                    changeTaskStatus={props.changeTaskStatus}
                    removeTask={props.removeTask}
                    key={task.id}/>
            )}
        </ul>
        : <span>List is empty</span>


    const onClickHandlerCreator = useCallback((filter: FilterValuesType) =>
            () => props.changeTodoListFilter(filter, props.id)
        , [props.changeTodoListFilter, props.id])

    const addNewTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const onClickHandler = useCallback((title: string) => props.changeTodoListTitle(title, props.id), [props.changeTodoListTitle, props.id])

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={onClickHandler}/>
                <button onClick={() => props.removeToDoList(props.id)}>x</button>
            </h3>
            <AddItemForm addItem={addNewTask}/>
            {tasksListItems}
            <div>
                <button

                    className={props.filter === "all" ? "btn-active" : ""}
                    onClick={onClickHandlerCreator("all")}>All
                </button>
                <button

                    className={props.filter === "active" ? "btn-active" : ""}
                    onClick={onClickHandlerCreator("active")}>Active
                </button>
                <button

                    className={props.filter === "completed" ? "btn-active" : ""}
                    onClick={onClickHandlerCreator("completed")}>Completed
                </button>
            </div>
        </div>
    );
})

export default TodoList;