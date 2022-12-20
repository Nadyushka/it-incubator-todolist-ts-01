import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {keyboardKey} from "@testing-library/user-event";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    value: string
    changeTitle: (newTitle: string)=> void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [title, setTitle] = useState<string>(props.value)
    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    const onEditMode = () => setIsEditMode(true)
    const offEditMode = () => {
        setIsEditMode(false)
        props.changeTitle(title)
    }

    const setLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyDownOffEditMode = (e: KeyboardEvent<HTMLInputElement>)=>{
        e.key === 'Enter' && offEditMode()
    }

    return (
        isEditMode
            ? <TextField
                onChange={setLocalTitle}
                value={title}
                autoFocus
                onBlur={offEditMode}
                onKeyDown={onKeyDownOffEditMode}
            />
            :
            <span onDoubleClick={onEditMode}>{props.value}</span>

    );
};

