import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const chuyenTrang = useNavigate();

  return (
    <div style={{ backgroundColor: "#ddd", padding: "10px" }}>
      <span
        onClick={() => chuyenTrang("/")}
        style={{ fontWeight: "bold", marginRight: "20px", cursor: "pointer" }}
      >
        Blog
      </span>

      <NavLink
        to="/"
        style={({ isActive }) => ({
          marginRight: "15px",
          color: isActive ? "blue" : "black",
        })}
      >
        Trang chủ
      </NavLink>

      <NavLink
        to="/create"
        style={({ isActive }) => ({
          color: isActive ? "blue" : "black",
        })}
      >
        Viết bài
      </NavLink>
    </div>
  );
};

export default Navbar;
