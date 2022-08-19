import React, { useState } from "react";
import { Link } from 'react-router-dom';

const NavItem = (props) => {
  const [open] = useState(false);
  return (
    <li className="nav-item">
      <a href={props.url || "/"} className="icon-button" />
      {props.icon}
      {open && props.children}
    </li>
  );
};

export default NavItem;
