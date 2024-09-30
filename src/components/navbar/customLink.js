import React from "react";
import { NavLink } from "react-router-dom";
import "./style.css";

const CustomNavLink = ({ to, text }) => {
  return (
    <NavLink to={to} className="linkActive" activeClassName="activeLink">
      {text}
    </NavLink>
  );
};

export default CustomNavLink;
