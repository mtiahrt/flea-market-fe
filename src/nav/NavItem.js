import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavItem = (props) => {
  const [open, setOpen] = useState(false);
  const handleClickEvent = (e) => {
    props.setActive((prev) => {
      return props.icon?.props.name === 'filter' &&
        props.icon?.props.name === prev
        ? 'home'
        : props.icon?.props.name;
    });
    if (props.isDropdown) {
      setOpen(!open);
    }
    if (props.clickHandler) {
      props.clickHandler();
    }
  };

  return (
    <li onClick={handleClickEvent} className="nav-item">
      <Link
        name={props.name}
        to={props.url ? `/${props.url}` : '#'}
        className={
          props.isActive === props.icon.props.name
            ? 'icon-button active'
            : 'icon-button'
        }
      >
        {props.icon}
      </Link>
      {open && props.children}
    </li>
  );
};

export default NavItem;
