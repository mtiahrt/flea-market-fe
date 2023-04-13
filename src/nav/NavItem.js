import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

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
  let history = useHistory();
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
    if (!isDropdown) {
      history.push(url ? `/${url}` : '#');
    }
  };

  return (
    <li
      style={{ ...style, cursor: 'pointer' }}
      onClick={handleClickEvent}
      className={`nav-item ${className ? className : ''}`}
    >
      <a
        name={name}
        className={
          isActive === icon.props.name ? 'icon-button active' : 'icon-button'
        }
      >
        {icon}
      </a>
      {open && children}
    </li>
  );
};

export default NavItem;
