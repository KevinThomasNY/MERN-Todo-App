import React from "react";
import { FiLogOut } from "react-icons/fi";

const LogoutButton = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  return (
    <button className="btn" onClick={handleLogout}>
      Logout <FiLogOut size={15} />
    </button>
  );
};

export default LogoutButton;
