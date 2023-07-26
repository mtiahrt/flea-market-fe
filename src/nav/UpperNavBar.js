import React from 'react';
import './Navigation.css';
import styled from 'styled-components';
import NavItems from './NavItems';

const UpperNavBar = () => {
  return (
    <StyledDiv>
      <StyledNav className="navbar">
        <ul className="navbar-nav">
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
  @media (max-width: 52em) {
    border-bottom: 5px solid var(--backdrop-color);
  }
`;

const StyledNav = styled.nav`
  align-content: stretch;
`;

export default UpperNavBar;
