import {TaskStateType} from '../App'
import {
    AddTaskAC,
    ChangeTaskStatusAC,
    ChangeTaskTitleAC,
    RemoveTaskAC,
    taskReducer
} from "./task-reducer";


test('correct task should be deleted from correct array', () => {
    const startState: TaskStateType = {
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false}
        ]
    }

    const endState = taskReducer(startState, RemoveTaskAC('todolistId2', '2'))

    expect(endState).toEqual({
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "3", title: "tea", isDone: false}
        ]
    });

})


test('correct task should be added ', () => {
    const startState: TaskStateType = {
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false}
        ]
    }

    const endState = taskReducer(startState, AddTaskAC('todolistId2', 'coffee'))

    expect(startState['todolistId2'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0]['title']).toBe('coffee')
    expect(endState['todolistId2'][0]['id']).toBe('4')
    expect(endState['todolistId2'][0]['isDone']).toBe(false)
})

test('correct task title should be changed ', () => {
    const startState: TaskStateType = {
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false}
        ]
    }

    const endState = taskReducer(startState, ChangeTaskTitleAC('todolistId2', '2', 'milk-tee'))


    expect(startState['todolistId2'][1]['title']).toBe('milk')
    expect(endState['todolistId2'][1]['title']).toBe('milk-tee')

})

