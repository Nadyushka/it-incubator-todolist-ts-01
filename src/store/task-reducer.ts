import {FilterValuesType, toDoListType, TaskStateType, TaskType} from '../App'
import {v1} from "uuid";
import {ADD_TODOLIST, AddToDoListActionType} from "./todoList-reducer";

export const REMOVE_TASK = 'REMOVE_TASK' as const;
export const ADD_TASK = 'ADD_TASK' as const;
export const CHANGE_TITLE = 'CHANGE_TITLE' as const;
export const CHANGE_STATUS = 'CHANGE_STATUS' as const;

type RemoveTaskAT = {
    type: typeof REMOVE_TASK
    todolistId: string
    taskId: string
}

type AddTaskAT = {
    type: typeof ADD_TASK
    todolistId: string
    title: string
}

type ChangeTaskTitleAT = {
    type: typeof CHANGE_TITLE
    todolistId: string
    taskId: string
    title: string
}

type ChangeTaskStatusAT = {
    type: typeof CHANGE_STATUS
    todolistId: string
    taskId: string
    isDone: boolean
}

type taskReducerActionTypes = RemoveTaskAT | AddTaskAT | ChangeTaskTitleAT | ChangeTaskStatusAT | AddToDoListActionType

export const taskReducer = (tasks: TaskStateType, action: taskReducerActionTypes): TaskStateType => {
    switch (action.type) {
        case REMOVE_TASK:
            return {
                ...tasks,
                [action.todolistId]: tasks[action.todolistId].filter(t => t.id !== action.taskId)
            }
        case ADD_TASK:
            const newTask: TaskType = {
                id: '4',
                title: action.title,
                isDone: false
            }
            return {
                ...tasks,
                [action.todolistId]: [newTask, ...tasks[action.todolistId]]
            }
        case CHANGE_TITLE:
            return {
                ...tasks,
                [action.todolistId]: tasks[action.todolistId].map(t => t.id === action.taskId ?
                    {...t, title: action.title} :
                    {...t})
            }
        case CHANGE_STATUS:
            return {
                ...tasks,
                [action.todolistId]: tasks[action.todolistId].map(t => t.id === action.taskId ?
                    {...t, isDone: action.isDone} :
                    {...t})
            }
        case ADD_TODOLIST:
        return {...tasks,[action.todolistId]:[]}

        default:
            return {...tasks}
    }
}

export const RemoveTaskAC = (todolistId: string, taskId: string) => ({
    type: REMOVE_TASK,
    todolistId: todolistId,
    taskId: taskId
})
export const AddTaskAC = (todolistId: string, title: string) => ({type: ADD_TASK, todolistId: todolistId, title: title})
export const ChangeTaskTitleAC = (todolistId: string, taskId: string, title: string) => ({
    type: CHANGE_TITLE,
    todolistId: todolistId,
    taskId: taskId,
    title: title
})
export const ChangeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => ({
    type: CHANGE_STATUS,
    todolistId: todolistId,
    taskId: taskId,
    isDone: isDone
})