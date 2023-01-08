import { Todo } from "../ServerTypes";
import { createContext, ReactNode, useContext } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export type TodosContextData = {
    todos: Array<Todo> | undefined;
    isLoadingTodos: boolean;
    isLoadingTodosError: boolean;
    updateTodo(id: number, completed: boolean): Promise<void>;
    updateTodo(todo: Todo, completed: boolean): Promise<void>;
    createTodo(content: string): Promise<Todo>;
};

const TodosContext = createContext<TodosContextData>(null!);

export function TodosContextProvider({ children }: { children: ReactNode }) {
    const { isLoading, isError, data: todos } = useQuery(['todos', 'list'], () => {
        return axios.get('/api/todos').then(res => res.data);
    });
    const updateTodoMutation = useMutation((todo: { id: number, completed: boolean }) => {
        return axios.put(`/api/todos/${todo.id}`, { completed: todo.completed }).then(res => res.data);
    });
    const createTodoMutation = useMutation((content: string) => {
        return axios.post('/api/todos', { content }).then(res => res.data);
    });

    const updateTodo = async (todo: Todo | number, completed: boolean) => {
        if (typeof todo !== 'number') todo = todo.id;

        const newTodo = {
            id: todo,
            completed,
        };
        await updateTodoMutation.mutateAsync(newTodo);
    }
    const createTodo = async (content: string) => {
        return await createTodoMutation.mutateAsync(content);
    }

    return (
        <TodosContext.Provider
            value={{
                todos: todos,
                isLoadingTodos: isLoading,
                isLoadingTodosError: isError,
                updateTodo,
                createTodo
            }}
        >
            {children}
        </TodosContext.Provider>
    )
}

export function useTodosContext() {
    return useContext(TodosContext);
}