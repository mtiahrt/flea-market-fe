import React, { useState } from 'react';
import './Navigation.css';
import styled from 'styled-components';

const NavBar = (props) => {
  const [active, setActive] = useState('home');
  return (
    <StyledDiv style={{}}>
      <StyledNav className="navbar">
        <ul className="navbar-nav">
          <li style={{ marginRight: 'auto' }}>
            <StyledH1>{props.title}</StyledH1>
          </li>
          {React.Children.map(props.children, (child) =>
            React.cloneElement(child, {
              isActive: active,
              setActive: setActive,
            })
          )}
        </ul>
      </StyledNav>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  border-bottom: 5px solid var(--backdrop-color);
`;

const StyledH1 = styled.h1`
  align-content: flex-start;
  font-size: var(--font-size-5);
  color: var(--logo-fill-color);
`;

const StyledNav = styled.nav`
  align-content: stretch;
  //margin: 2px 0 1em 0;
`;

export default NavBar;
