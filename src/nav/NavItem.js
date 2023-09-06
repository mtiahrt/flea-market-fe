import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useOutsideClickNotifier from '../hooks/useOutsideClickNotifier';

const NavItem = ({
  setActive,
  isActive,
  icon,
  name,
  isDropdown,
  url,
  children,
  classNameLi,
  classNameA,
  clickHandler,
  style,
  imageURL,
}) => {
  let history = useHistory();
  const [open, setOpen] = useState(false);
  const clickRef = useRef(null);
  useOutsideClickNotifier(clickRef, setOpen);

  const handleClickEvent = (e) => {
    if (setActive) {
      setActive(icon?.props.name);
    }
    if (clickHandler) {
      clickHandler();
    }
    if (isDropdown) {
      setOpen(!open);
    }
    if (url) {
      history.push(url ? `/${url}` : '#');
    }
  };
  return (
    <li
      ref={isDropdown ? clickRef : null}
      style={{ ...style, cursor: 'pointer' }}
      onClick={handleClickEvent}
      className={classNameLi}
    >
      {name}
      <a
        className={
          isActive === icon?.props.name ? `active ${classNameA}` : classNameA
        }
      >
        {imageURL ? <img alt="profile photo" src={imageURL} /> : icon}
      </a>
      {open && children}
    </li>
  );
};

export default NavItem;
