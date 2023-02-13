import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavItem = (props) => {
  const [open, setOpen] = useState(false);
  console.log('open is:', open);
  return (
    <li
      onClick={props.isDropdown ? () => setOpen(!open) : null}
      className="nav-item"
    >
      <Link to={props.url ? `/${props.url}` : '#'} className="icon-button">
        {props.icon}
      </Link>
      {open && props.children}
    </li>
  );
};

export default NavItem;
