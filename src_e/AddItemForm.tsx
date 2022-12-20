import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, IconButton, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";


type AddItemFormPropsType={
    addItem:(title:string)=>void
}

export const AddItemForm = (props: AddItemFormPropsType) => {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)


    const setLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const errorMessage = error
        ? 'Please, enter task title'
        : null

    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }

    const onEnterAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItem()
        }
    }

    return (
        <div>
            <TextField
                variant={"outlined"}
                label={'Type value'}
                value={title}
                onKeyDown={onEnterAddItem}
                onChange={setLocalTitle}
                error={error}
                helperText={errorMessage}
            />
            <IconButton color={"primary"}  onClick={addItem}>
                <ControlPoint/>
            </IconButton>
                    </div>
    );
};

