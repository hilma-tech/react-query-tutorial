import { Todo } from "../ServerTypes";
import { createContext, ReactNode, useContext } from "react";
import { useCreateTodoMutation, useTodosQuery, useUpdateTodoMutation } from "../hooks/useTodosHooks";

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
    const { isLoading, isError, data: todos } = useTodosQuery();
    const updateTodoMutation = useUpdateTodoMutation();
    const createTodoMutation = useCreateTodoMutation();

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