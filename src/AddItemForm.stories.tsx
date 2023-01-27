import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import AddItemForm from "./AddItemForm";



// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TODOLIST/AddItemForm',
  component: AddItemForm,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    onClick: {
      description: 'Button was clicked inside form'
    }
  },
} as ComponentMeta<typeof AddItemForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AddItemFormStory.args = {
 addItem: action('Button was clicked inside form')
};

const Template1: ComponentStory<typeof AddItemForm> = (args) => {


  const [title, setTitle] = useState<string>("")
  const [error, setError] = useState<boolean>(true)

  const setLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
    error && setError(false)
    setTitle(e.currentTarget.value)
  }

  const addTask = () => {
    const trimmedTitle = title.trim()
    if (trimmedTitle) {
      args.addItem(trimmedTitle)
    } else {
      setError(true)
    }
    setTitle("")
  }

  const onEnterAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTask()
    }
  }

  const errorStyles = {fontWeight: "bold", color: "red"}
  const errorMessage = error
      ? <div style={errorStyles}>Please, enter task title</div>
      : null

  return (
      <div>
        <input
            value={title}
            onKeyDown={onEnterAddTask}
            onChange={setLocalTitle}
            className={error ? "input-error" : ""}
        />
        <button onClick={addTask}>+</button>
        {errorMessage}
      </div>
  )

};

export const AddItemFormStoryError = Template1.bind({});
AddItemFormStoryError.args = {
  addItem: action('Button was clicked inside form')
};