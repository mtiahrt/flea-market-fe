import React from 'react';
import './Navigation.css';
import styled from 'styled-components';
import NavItems from './NavItems';
import { Link } from 'react-router-dom';
import { ReactComponent as HamburgerIcon } from '../icons/menu-hamburger.svg';

const UpperNavBar = () => {
  return (
    <StyledDiv>
      <StyledNav className="navbar">
        <ul className="navbar-nav">
          <StyledLi className="nav-item">
            <HamburgerIcon />
          </StyledLi>
          <StyledLiTitle>
            <Link to={'/#'}>
              <StyledH1>Upcycle Treasures</StyledH1>
            </Link>
          </StyledLiTitle>
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
  @media (max-width: 40em) {
    border-bottom: 5px solid var(--backdrop-color);
  }
`;

const StyledLi = styled.li`
  margin-right: auto;
  display: none;
  @media (max-width: 40em) {
    display: block;
  }
`;
const StyledLiTitle = styled.li`
  flex-grow: 0.4;
`;

const StyledH1 = styled.h1`
  font-size: var(--font-size-5);
  color: var(--logo-fill-color);
`;

const StyledNav = styled.nav`
  align-content: stretch;
`;

export default UpperNavBar;
