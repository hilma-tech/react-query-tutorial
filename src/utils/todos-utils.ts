import { Todo } from "../ServerTypes";
import axios from "axios/index";

export async function fetchAllTodos(): Promise<Todo[]> {
    const { data } = await axios.get('/api/todos');
    return data;
}

export async function updateTodoCompletedById(id: number, completed: boolean): Promise<Todo> {
    const { data } = await axios.patch(`/api/todos/${id}`, { completed });
    return data;
}

export async function createTodo(title: string): Promise<Todo> {
    const { data } = await axios.post('/api/todos', { title });
    return data;
}