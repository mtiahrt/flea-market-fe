import React from 'react';
import './Navigation.css';
import styled from 'styled-components';
import NavItems from './NavItems';

const NavBar = () => {
  return (
    <StyledDiv style={{}}>
      <StyledNav className="navbar">
        <ul className="navbar-nav">
          <li style={{ marginRight: 'auto' }}>
            <StyledH1>Mark Tiahrt</StyledH1>
          </li>
          <NavItems />
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
`;

export default NavBar;
