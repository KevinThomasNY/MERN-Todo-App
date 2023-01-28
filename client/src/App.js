import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./light.css";
import Login from "./components/Login";
import Register from "./components/Register";
import SharedLayout from "./pages/SharedLayout.js";
import Error from "./pages/Error.js";
import TodoList from "./components/TodoList";
import EditTodo from "./components/EditTodo";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/todos" element={<TodoList />} />
            <Route path="/edit-todo/:id" element={<EditTodo />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
