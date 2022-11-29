import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavItem = (props) => {
  const [open] = useState(false);
  return (
    <li className="nav-item">
      <Link to={`/${props.url}`} className="icon-button">
        {props.icon}
      </Link>
      {open && props.children}
    </li>
  );
};

export default NavItem;
