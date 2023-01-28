import React, { useState } from "react";
import { FiLogIn } from "react-icons/fi";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://todo-app-42t3.onrender.com/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      if (!res.ok) {
        const error = await res.json();
        setError(error.message);
        return;
      }
      const data = await res.json();
      localStorage.setItem("token", data.token);
      window.location.href = "/todos";
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="section">
      <div className="center-div">
        <form className="form" onSubmit={handleSubmit}>
          <h5>Login</h5>
          <label className="form-label">
            Email:
            <input
              className="form-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <br />
          <label className="form-label">
            Password:
            <input
              className="form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <br />
          {error && <p>{error}</p>}
          <button className="btn" type="submit">
            Login <FiLogIn size={17} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
