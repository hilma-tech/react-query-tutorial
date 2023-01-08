import { KeyboardEvent, useRef, useState } from "react";
import { useTodosContext } from "../contexts/TodosContext";

export function CreateTodoInput() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isCreating, setIsCreating] = useState(false);
    const { createTodo } = useTodosContext();

    const handleSubmitTodo = async () => {
        const content = inputRef.current?.value;
        if (!content) return;
        try {
            setIsCreating(true);
            await createTodo(content);
            inputRef.current!.value = '';
        }
        finally {
            setIsCreating(false);
        }
    }
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return; // only submit on enter
        event.preventDefault();
        handleSubmitTodo();
    }

    return <input ref={inputRef} disabled={isCreating} onKeyDown={handleKeyDown} />
}