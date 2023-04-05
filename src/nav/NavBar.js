import React, { useState } from 'react';
import './Navigation.css';

const NavBar = (props) => {
  const [active, setActive] = useState('home');
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        {React.Children.map(props.children, (child) =>
          React.cloneElement(child, {
            isActive: active,
            setActive: setActive,
          })
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
