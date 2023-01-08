import React from "react";
import TodoItem from "./TodoItem";
import { useTodosContext } from "../contexts/TodosContext";

export default function TodoList() {
    const { isLoadingTodos, isLoadingTodosError, todos } = useTodosContext();
    if (isLoadingTodos) return <div>Loading...</div>;
    if (isLoadingTodosError) return <div>Error</div>
    if (!todos?.length) return <div>No todos</div>;
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem'
        }}>
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    {...todo}
                />
            ))}
        </div>
    )
}