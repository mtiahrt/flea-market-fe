import React, { useState } from 'react';
import './Navigation.css';
import styled from 'styled-components';

const NavBar = (props) => {
  const [active, setActive] = useState('home');
  return (
    <StyledDiv>
      <StyledNav
        // style={{
        //   margin: '2px 0 1em 0',
        //   position: 'sticky',
        //   top: '0px',
        //   zIndex: '1',
        // }}
        className="navbar"
      >
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
  //display: flex;
`;

const StyledH1 = styled.h1`
  align-content: flex-start;
  height: 10px;
  font-size: var(--font-size-5);
`;

const StyledNav = styled.nav`
  align-content: stretch;
  margin: 2px 0 1em 0;
`;

export default NavBar;
