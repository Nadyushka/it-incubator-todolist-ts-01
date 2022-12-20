import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {DeleteOutline, HighlightOff} from "@mui/icons-material";
import {Button, IconButton} from "@mui/material";
import Checkbox from '@material-ui/core/Checkbox';
import classes from "*.module.css";




//rsc
// typescript =>
// 1. Variable
// 2. Param of func
// 3. Return of func

type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string, todoListId: string) => void
    removeTask: (taskId: string, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void,
    changeTodoListTitle: (title: string, ID: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void,
    changeTodoListFilter: (nextFilterValue: FilterValuesType, todoListId: string) => void
}

const TodoList = (props: TodoListPropsType) => {

    const tasksListItems = props.tasks.length
        ? <div>{
            props.tasks.map((task) => {
                const removeTask = () => props.removeTask(task.id, props.todoListId)
                const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
                    props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)

                const changeTaskTitle = (value: string) => {
                    props.changeTaskTitle(task.id, value, props.todoListId)
                }

                return (
                    <div key={task.id}>
                        <IconButton onClick={removeTask}>
                            <HighlightOff/>
                        </IconButton>

                        <Checkbox
                            color={"primary"}
                            onChange={changeTaskStatus}
                            checked={task.isDone}


                        />

                        <div style={{display: 'inline-block'}} className={task.isDone ? "task-done" : ""}>
                            <EditableSpan value={task.title} changeTitle={changeTaskTitle}/>
                        </div>
                        {/*<span*/}
                        {/*    className={task.isDone ? "task-done" : ""}>{task.title}</span>*/}


                    </div>
                )
            })}</div>
        : <span>List is empty</span>

    const onClickHandlerCreator = (filter: FilterValuesType) =>
        () => props.changeTodoListFilter(filter, props.todoListId)
    const removeTodoList = () => props.removeTodoList(props.todoListId)

    const addNewTask = (title: string) => {
        props.addTask(title, props.todoListId)
    }

    const changeTodolistTitle = (title: string) => {
        props.changeTodoListTitle(title, props.todoListId)
    }

    return (
        <div>
            <h3>
                <EditableSpan value={props.title} changeTitle={changeTodolistTitle}/>
                <IconButton onClick={removeTodoList}>
                    <DeleteOutline/>
                </IconButton>
            </h3>
            <div>
                <AddItemForm addItem={addNewTask}/>
            </div>
            {tasksListItems}
            <div>
                <Button
                    size='small'
                    color={"error"}
                    variant={props.filter === "all" ? "contained" : "text"}

                    onClick={onClickHandlerCreator("all")}>All
                </Button>
                <Button
                    size='small'
                    color={"secondary"}
                    variant={props.filter === "active" ? "contained" : "text"}
                    onClick={onClickHandlerCreator("active")}>Active
                </Button>
                <Button
                    size='small'
                    color={"primary"}
                    variant={props.filter === "completed" ? "contained" : "text"}
                    onClick={onClickHandlerCreator("completed")}>Completed
                </Button>
            </div>
        </div>
    );
};

export default TodoList;