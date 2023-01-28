import React, { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const MySwal = new withReactContent(Swal);
    try {
      const res = await fetch(
        "https://todo-app-42t3.onrender.com/api/users/register",
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
      MySwal.fire({
        position: "top-end",
        icon: "success",
        title: "New Account Created!",
        showConfirmButton: false,
        timer: 1800,
      }).then(function () {
        window.location.href = "/";
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="sections">
      <div className="center-div">
        <form className="form" onSubmit={handleSubmit}>
          <h5>Create new Account</h5>
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
          <a style={{ color: "#999" }} href="/">
            Already have an account?
          </a>
          <br />
          <br />
          {error && <p>{error}</p>}
          <button className="btn" type="submit">
            Register <IoMdAddCircleOutline size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
