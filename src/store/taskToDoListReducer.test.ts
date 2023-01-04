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



