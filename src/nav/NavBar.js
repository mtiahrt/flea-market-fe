import React, { useState } from 'react';
import './Navigation.css';
import styled from 'styled-components';

const NavBar = (props) => {
  const [active, setActive] = useState('home');
  return (
    <StyledNav
      style={{ margin: '2px 0 1em 0', position: 'sticky', top: '0px' }}
      className="navbar"
    >
      <ul className="navbar-nav">
        {React.Children.map(props.children, (child) =>
          React.cloneElement(child, {
            isActive: active,
            setActive: setActive,
          })
        )}
      </ul>
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  margin: 2px 0 1em 0;
`;
export default NavBar;
