import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import Task from "./Task";
import {TaskType} from "./App";



// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TODOLIST/Task',
  component: Task,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  } as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskStoryOne = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskStoryOne.args = {
  toDolistId: 'todolistId1',
  task: {id: '4440', title:' HTML', isDone: true},
  removeTask: action('Task was deleted'),
  changeTaskTitle: action('Task title was deleted'),
  changeTaskStatus: action('Task status was deleted'),
};

export const TaskStoryTwo = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskStoryTwo.args = {
  toDolistId: 'todolistId1',
  task: {id: '440', title:'React', isDone: false},
  removeTask: action('Task was deleted'),
  changeTaskTitle: action('Task title was deleted'),
  changeTaskStatus: action('Task status was deleted'),
};

