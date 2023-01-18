import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from './AddItemForm';
import EditableSpan from "./EditableSpan";
import {ChangeTaskStatusAC} from "./store/task-reducer";
import {useDispatch} from "react-redux";


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
    changeTaskStatus?: (taskId: string, isDone: boolean, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeTodoListFilter: (nextFilterValue: FilterValuesType, todolistId: string) => void
    removeToDoList: (todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
    changeTodoListTitle: (title: string, todolistId: string) => void
}

const TodoList = React.memo( (props: TodoListPropsType) => {

    console.log('TodoList')

    const dispatch = useDispatch()

    let tasks:Array<TaskType>;

            switch (props.filter) {
                case "completed":
                    tasks = props.tasks.filter(task => task.isDone)
                case "active":
                    tasks = props.tasks.filter(task => !task.isDone)
                default:
                    tasks = props.tasks
            }


    const tasksListItems = props.tasks.length
        ? <ul>{
            tasks.map((task) => {
                const removeTask = () => props.removeTask(task.id, props.id)
                const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
                    dispatch(ChangeTaskStatusAC(props.id, task.id, e.currentTarget.checked,))

                const changeTaskTitle = (title: string) => {
                    props.changeTaskTitle(task.id, title, props.id)
                }

                return (
                    <li key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.isDone}
                            onChange={changeTaskStatus}
                        />
                        <span className={task.isDone ? "task-done" : ""}>
                            <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                        </span>
                        <button onClick={removeTask}>x</button>
                    </li>
                )
            })}</ul>
        : <span>List is empty</span>


    const onClickHandlerCreator = (filter: FilterValuesType) =>
        () => props.changeTodoListFilter(filter, props.id)

    const addNewTask = useCallback((title: string) => {
            props.addTask(title, props.id)
        }
        , [props.addTask,props.id])

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={(title) => props.changeTodoListTitle(title, props.id)}/>
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