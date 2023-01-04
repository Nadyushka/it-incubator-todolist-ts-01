import {TaskStateType, toDoListType} from "../App";
import {AddToDoListAC, RemoveToDoListAC, toDolistsReducer} from "./todoList-reducer";
import {taskReducer} from "./task-reducer";


test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodolistsState: Array<toDoListType> = [];

    const action = AddToDoListAC("new todolist");

    const endTasksState = taskReducer(startTasksState, action)
    const endTodolistsState = toDolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);
});



test('property with todolistId should be deleted', () => {
    const startState: TaskStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };

    const action = RemoveToDoListAC("todolistId2");

    const endState = taskReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});