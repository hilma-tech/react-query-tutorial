import { Todo } from "../ServerTypes";
import { createContext, ReactNode, useContext } from "react";

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
    // TODO: implement here 3 things: a query to list todos, a mutation to update a todo, and a mutation to create a todo
    // TODO: from the query, extract those values: isLoading, isError, data (extract it as todos)
    const updateTodo = async (todo: Todo | number, completed: boolean) => {
        if (typeof todo !== 'number') todo = todo.id;

        // TODO: implement the logic to update a todo using React Query's useMutation hook
    }
    const createTodo = async (content: string) => {
        // TODO: implement the logic to create a todo using React Query's useMutation hook
        // TODO: this function should return the newly created todo
        return undefined!;
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










































// noinspection ES6ConvertVarToLetConst
var todos: any = undefined;
// noinspection ES6ConvertVarToLetConst
var isLoading: any = undefined;
// noinspection ES6ConvertVarToLetConst
var isError: any = undefined;