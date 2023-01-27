import React, {memo, useState} from 'react';

type PropsType = {
    title: string
    changeTitle: (title: string) => void
}

const EditableSpan = React.memo( (props: PropsType) => {

    const [isEditMode, setEditMode] = useState<boolean>(false)
    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }

    const [title, setTitle] = useState<string>(props.title)

    return (
        isEditMode ?
            <input value={title}
                   onBlur={offEditMode}
                   autoFocus
                   onChange={(e) => setTitle(e.currentTarget.value)}
                   onKeyDown={(e) => e.key === 'Enter' && offEditMode()}
            /> :
            <span onDoubleClick={onEditMode}> {props.title}</span>
    );
})

export default EditableSpan;