import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import Task from "./Task";
import {TaskType} from "./App";


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLIST/Task',
    component: Task,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        task: {id: '4440', title: ' HTML', isDone: true},
        toDolistId: 'todolistId1',
        removeTask: action('Task was deleted'),
        changeTaskTitle: action('Task title was deleted'),
        changeTaskStatus: action('Task status was deleted'),
    }
} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskStoryTrue = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args


export const TaskStoryFalse = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskStoryFalse.args = {
    task: {id: '440', title: 'React', isDone: false},
};

