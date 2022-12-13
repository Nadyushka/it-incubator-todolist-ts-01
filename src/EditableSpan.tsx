import React, {useState} from 'react';

type PropsType = {
    title: string
}

const EditableSpan = (props: PropsType) => {

    const [isEditMode, setEditMode] = useState<boolean>(false)
    const onEditMode = () => setEditMode(true)
    const offEditMode = () => setEditMode(false)

    return (
        isEditMode ?
            <input onBlur={offEditMode}/> :
            <span onDoubleClick={onEditMode}> {props.title}</span>
    );
};

export default EditableSpan;