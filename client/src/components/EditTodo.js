import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const EditTodo = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState([]);
  const [error, setError] = useState("");
  //Fetching the todo to edit
  const fetchTodo = async (id) => {
    try {
      const res = await fetch(
        `https://todo-app-42t3.onrender.com/api/todos?_id=${id}`,
        {
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
      const data = await res.json();
      //fliter todo
      setTodo(data.filter((todo) => todo._id === id)[0]);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchTodo(id);
  }, [id]);
  // handle form change
  const handleChange = (e) => {
    setTodo({ ...todo, task: e.target.value });
  };
  const updateTodo = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `https://todo-app-42t3.onrender.com/api/todos/${todo._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(todo),
        }
      );
      if (!res.ok) {
        const error = await res.json();
        setError(error.message);
        return;
      }
      window.location.href = "/todos";
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="section center-div">
      <form className="todo-form" onSubmit={updateTodo}>
        <input
          type="text"
          placeholder="Task"
          value={todo.task || ""}
          onChange={handleChange}
          required
        />
        <button className="btn-add" type="submit">
          Update Todo
        </button>
      </form>
      {error && <p>error</p>}
    </div>
  );
};

export default EditTodo;
