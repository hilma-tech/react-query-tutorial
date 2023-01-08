import './App.css'
import TodoList from "./components/TodoList";
import { TodosContextProvider } from "./contexts/TodosContext";
import { CreateTodoInput } from "./components/CreateTodoInput";

function App() {
    return (
        <TodosContextProvider>
            <TodoList />
            <CreateTodoInput />
        </TodosContextProvider>
    )
}

export default App
