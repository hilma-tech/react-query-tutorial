import React, { useState } from 'react';
import clsx from "clsx";
import { Todo } from '../ServerTypes';

import { useTodosContext } from "../contexts/TodosContext";

import Styles from './TodoItem.module.css';

type TodoItemProps = Todo;

function TodoItem(props: TodoItemProps) {
    const { updateTodo } = useTodosContext();
    const [isUpdating, setIsUpdating] = useState(false);
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target;
        setIsUpdating(true);
        updateTodo(props.id, checked).then(() => setIsUpdating(false));
    }

    return (
        <div className={clsx(Styles.todo, isUpdating && Styles.updating)}>
            <input
                type="checkbox"
                checked={props.completed}
                disabled={isUpdating}
                onChange={handleCheckboxChange}
            />

            <div>
                <a className={Styles.title} href={`/todos/${props.id}`}>{props.title}</a>
                <a className={Styles.author} href={`/users/${props.userId}`}>{props.username}</a>
            </div>
        </div>
    );
}

export default TodoItem;