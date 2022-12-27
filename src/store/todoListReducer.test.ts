import {v1} from "uuid";
import {ADD_TODOLIST, CHANGE_FILTER, CHANGE_TITLE, REMOVE_TODOLIST, toDolistsReducer} from "./todoList-reducer";
import {FilterValuesType, toDoListType} from '../App'

test('correct todolist should be removed', () => {
    //
    const todolistId1 = v1();
    const todolistId2 = v1();
    const startState: Array<toDoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    let action = {
        type: REMOVE_TODOLIST,
        todolistId: todolistId1,
    }

    const endState = toDolistsReducer(startState, action)
    //
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    //
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<toDoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    let action = {
        type: ADD_TODOLIST,
        title: newTodolistTitle
    }

    const endState = toDolistsReducer(startState, action)
    //
    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<toDoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    let action = {
        type: CHANGE_TITLE,
        title: newTodolistTitle,
        todolistId: todolistId2
    }

    const endState = toDolistsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValuesType = "completed";

    const startState: Array<toDoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    let action = {
        type:  CHANGE_FILTER,
        nextFilterValue: newFilter,
        todolistId: todolistId2
    }

    const endState = toDolistsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
