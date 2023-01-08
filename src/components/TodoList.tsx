import React from "react";
import TodoItem from "./TodoItem";
import { useTodosQuery } from "../hooks/useTodosHooks";

export default function TodoList() {
    const { data, isLoading, isError, error } = useTodosQuery();

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {JSON.stringify(error)}</div>
    if (!data?.length) return <div>No todos</div>;
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem'
        }}>
            {data.map(todo => (
                <TodoItem
                    key={todo.id}
                    {...todo}
                />
            ))}
        </div>
    )
}