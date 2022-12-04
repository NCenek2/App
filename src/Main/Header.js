import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Header = ({ showNav, toggleNav }) => {
  const navigate = useNavigate();

  return (
    <header className="header-outer">
      <div className="header-inner">
        <h1>My Portfolio</h1>
        <i className="fa fa-bars" aria-hidden="true" onClick={toggleNav}></i>
      </div>
      <ul className={`menu ${showNav && "show-menu"}`}>
        <li onClick={() => navigate("/App/")}>Home</li>
        <li onClick={() => navigate("/App/front-end-development")}>
          Front End Development
        </li>
        <li onClick={() => navigate("/App/python")}>Python</li>
      </ul>
    </header>
  );
};

export default Header;
