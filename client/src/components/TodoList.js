import React from "react";
import { useState, useEffect } from "react";
import NoToken from "./NoToken";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const [task, setTask] = useState("");
  useEffect(() => {
    fetchTodos();
  }, []);
  //Get the Todos
  const fetchTodos = async () => {
    try {
      const res = await fetch("https://todo-app-42t3.onrender.com/api/todos", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) {
        const error = await res.json();
        setError(error.message);
        return;
      }
      const data = await res.json();
      setTodos(data);
      setTask("");
    } catch (error) {
      setError(error.message);
    }
  };

  //Create Todo
  //handle change
  const handleChange = (e) => {
    setTask(e.target.value);
  };

  //create a new todo
  const createTodo = async (e) => {
    e.preventDefault();
    try {
      const body = JSON.stringify({ task });
      const res = await fetch("https://todo-app-42t3.onrender.com/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body,
      });
      if (!res.ok) {
        const error = await res.json();
        setError(error.message);
        return;
      }
      const data = await res.json();
      setTodos([...todos, data]);
      setTask("");
    } catch (error) {
      setError(error.message);
    }
  };

  //Delete Todo
  const deleteTodo = async (id) => {
    try {
      const res = await fetch(
        `https://todo-app-42t3.onrender.com/api/todos/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!res.ok) {
        const error = await res.json();
        setError(error.message);
        return;
      }
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  //Mark Todo as Completed
  const markComplete = async (id) => {
    try {
      const currentTodo = todos.find((todo) => todo._id === id);
      const task = currentTodo.task;
      const completed = !currentTodo.completed;
      const res = await fetch(
        `https://todo-app-42t3.onrender.com/api/todos/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ task, completed }),
        }
      );
      if (!res.ok) {
        const error = await res.json();
        setError(error.message);
        return;
      }
      const updatedTodos = todos.map((todo) => {
        if (todo._id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
      setTodos(updatedTodos);
    } catch (error) {
      setError(error.message);
    }
  };
  //Go to edit page button
  const handleEdit = (id) => {
    window.location.href = `/edit-todo/${id}`;
  };

  //If user does not have a token
  if (!localStorage.getItem("token")) {
    return <NoToken />;
  }
  //If user has a token
  return (
    <div className="section center-div">
      <div className="card-container">
        <form className="todo-form" onSubmit={createTodo}>
          <input
            type="text"
            placeholder="Task"
            value={task}
            onChange={handleChange}
            required
          />
          <button className="btn-add" type="submit">
            Add Todo
          </button>
        </form>
        {todos.map((todo) => (
          <div className="card" key={todo._id}>
            <p className={todo.completed ? "completed" : ""}>{todo.task}</p>
            <div className="buttons-container" style={{ float: "right" }}>
              <button
                className="complete-button green-text"
                onClick={() => markComplete(todo._id)}
              >
                <AiOutlineCheck size={22} />
              </button>
              <button
                className="edit-button"
                onClick={() => handleEdit(todo._id)}
              >
                <BiEdit size={22} />
              </button>
              <button
                className="delete-button red-text"
                onClick={() => deleteTodo(todo._id)}
              >
                <AiFillDelete size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {error && <p>error</p>}
    </div>
  );
};

export default TodoList;
