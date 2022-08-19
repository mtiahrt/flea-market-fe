import React, { useState } from "react";

const NavItem = (props) => {
  const [open] = useState(false);
  return (
    <li className="nav-item">
      <a href={props.url || "/"} className="icon-button" >
      {props.icon}</a>
      {open && props.children}
    </li>
  );
};

export default NavItem;
