import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { createTodo, fetchAllTodos, updateTodoCompletedById } from "../utils/todos-utils";
import { Todos } from "../ServerTypes";

export function useTodosQuery(): UseQueryResult<Todos> {
    return useQuery(['todos', 'list'], fetchAllTodos);
}

export function useCreateTodoMutation() {
    return useMutation(createTodo);
}

export function useUpdateTodoMutation() {
    return useMutation(
        (payload: { id: number, completed: boolean }) => updateTodoCompletedById(payload.id, payload.completed)
    );
}