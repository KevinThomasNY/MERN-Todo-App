import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";
const Navbar = () => {
  return (
    <nav className={`navbar`}>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "link active" : "link")}
      >
        Login
      </NavLink>
      <NavLink
        to="/register"
        className={({ isActive }) => (isActive ? "link active" : "link")}
      >
        Register
      </NavLink>
      <NavLink
        to="/todos"
        className={({ isActive }) => (isActive ? "link active" : "link")}
      >
        Todo List
      </NavLink>
      <LogoutButton />
    </nav>
  );
};
export default Navbar;
