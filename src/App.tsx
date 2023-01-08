import './App.css'
import TodoList from "./components/TodoList";
import { CreateTodoInput } from "./components/CreateTodoInput";

function App() {
    return (
        <div>
            <TodoList />
            <CreateTodoInput />
        </div>
    )
}

export default App
