import React from 'react'
import { Provider } from 'react-redux'
import {combineReducers, createStore, legacy_createStore} from 'redux'
import { v1 } from 'uuid'
import { AppRootStateType } from './state'
import { taskReducer } from './task-reducer'
import { toDolistsReducer } from './todoList-reducer'


const id_1 = v1();
const id_2 = v1();

const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: toDolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: id_1, title: "What to learn", filter: 'all'},
        {id: id_2, title: "What to buy", filter: 'all'}
    ],
    tasks: {
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
    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as any)

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)
