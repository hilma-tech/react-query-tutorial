import React from 'react';
import clsx from "clsx";
import { Todo } from '../ServerTypes';

import { useUpdateTodoMutation } from "../hooks/useTodosHooks";

import Styles from './TodoItem.module.css';

type TodoItemProps = Todo;

function TodoItem(props: TodoItemProps) {
    const updateTodoMutation = useUpdateTodoMutation();

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target;
        updateTodoMutation.mutate(
            { id: props.id, completed: checked },
        );
    }

    return (
        <div className={clsx(Styles.todo, updateTodoMutation.isLoading && Styles.updating)}>
            <input
                type="checkbox"
                checked={props.completed}
                disabled={updateTodoMutation.isLoading}
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