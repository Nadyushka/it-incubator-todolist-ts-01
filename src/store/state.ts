import {taskReducer} from "./task-reducer";
import {combineReducers, legacy_createStore} from 'redux'
import {toDolistsReducer} from "./todoList-reducer";


export const rootReducer = combineReducers({
    tasks: taskReducer,
    toDoLists: toDolistsReducer,
})


export const store = legacy_createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>