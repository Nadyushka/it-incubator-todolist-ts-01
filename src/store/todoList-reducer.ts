import {FilterValuesType, toDoListType} from '../App'
import {v1} from "uuid";

export const REMOVE_TODOLIST = 'REMOVE-TODOLIST' as const;
export const ADD_TODOLIST = 'ADD-TODOLIST' as const;
export const CHANGE_TITLE = 'CHANGE-TODOLIST-TITLE' as const;
export const CHANGE_FILTER = 'CHANGE-TODOLIST-FILTER' as const;

type RemoveToDoListActionType = {
    type: typeof REMOVE_TODOLIST
    todolistId: string
}

type AddToDoListActionType = {
    type: typeof ADD_TODOLIST
    title: string
}

type ChangeToDoListTitleActionType = {
    type: typeof CHANGE_TITLE
    title: string
    todolistId: string
}

type ChangeToDoListFilterActionType = {
    type: typeof CHANGE_FILTER
    nextFilterValue: FilterValuesType
    todolistId: string
}

type toDolistsReducerActionTypes = RemoveToDoListActionType | AddToDoListActionType | ChangeToDoListTitleActionType | ChangeToDoListFilterActionType

export const toDolistsReducer = (toDoLists: toDoListType[], action: toDolistsReducerActionTypes) => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return toDoLists.filter(tl => tl.id !== action.todolistId)
        case ADD_TODOLIST:
            const newToDolistId = v1();
            const newToDolist: toDoListType = {
                id: newToDolistId,
                title: action.title,
                filter: 'all'
            }
            return [...toDoLists, newToDolist]
        case CHANGE_TITLE:
            return toDoLists.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)
        case CHANGE_FILTER:
            return toDoLists.map(tl => tl.id === action.todolistId ? {...tl, filter: action.nextFilterValue} : tl)

        default:
            return toDoLists
    }
}

export const RemoveToDoListAC = (todolistId:string) => ({type: REMOVE_TODOLIST, todolistId: todolistId })
export const AddToDoListAC = (title:string) => ({type: ADD_TODOLIST, title: title })