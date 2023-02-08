import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavItem = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>
      {open && props.children}
    </li>
    // <li className="nav-item">
    //   <Link to={`/${props.url}`} className="icon-button">
    //     {props.icon}
    //   </Link>
    //   {open && props.children}
    // </li>
  );
};

export default NavItem;
