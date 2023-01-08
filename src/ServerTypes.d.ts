export type Todo = {
    id: number;
    userId: string;
    username: string;
    title: string;
    completed: boolean;
}

export type Todos = Todo[];