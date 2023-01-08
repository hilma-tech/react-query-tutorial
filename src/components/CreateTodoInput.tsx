import { KeyboardEvent, useRef } from "react";
import { useCreateTodoMutation } from "../hooks/useTodosHooks";

export function CreateTodoInput() {
    const inputRef = useRef<HTMLInputElement>(null);
    const createTodoMutation = useCreateTodoMutation();

    const handleSubmitTodo = async () => {
        const content = inputRef.current?.value;
        if (!content) return;
        await createTodoMutation.mutateAsync(
            content,
            {
                onSuccess: () => {
                    inputRef.current!.value = '';
                }
            }
        );
    }
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return; // only submit on enter
        event.preventDefault();
        handleSubmitTodo();
    }

    return <input ref={inputRef} disabled={createTodoMutation.isLoading} onKeyDown={handleKeyDown} />
}