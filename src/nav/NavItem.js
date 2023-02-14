import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavItem = (props) => {
  const [open, setOpen] = useState(false);
  const handleClickEvent = (e) => {
    if (props.isDropdown) {
      setOpen(!open);
    }
    if (props.clickHandler) {
      props.clickHandler();
    }
  };

  return (
    <li onClick={handleClickEvent} className="nav-item">
      <Link to={props.url ? `/${props.url}` : '#'} className="icon-button">
        {props.icon}
      </Link>
      {open && props.children}
    </li>
  );
};

export default NavItem;
