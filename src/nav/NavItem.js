import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavItem = ({
  setActive,
  isActive,
  icon,
  name,
  isDropdown,
  url,
  children,
  className,
  clickHandler,
  style,
}) => {
  const [open, setOpen] = useState(false);
  const handleClickEvent = (e) => {
    if (setActive) {
      setActive(icon?.props.name);
    }
    if (isDropdown) {
      setOpen(!open);
    }
    if (clickHandler) {
      clickHandler();
    }
  };

  return (
    <li
      style={style}
      onClick={handleClickEvent}
      className={`nav-item ${className ? className : ''}`}
    >
      <Link
        name={name}
        to={url ? `/${url}` : '#'}
        className={
          isActive === icon.props.name ? 'icon-button active' : 'icon-button'
        }
      >
        {icon}
      </Link>
      {open && children}
    </li>
  );
};

export default NavItem;
