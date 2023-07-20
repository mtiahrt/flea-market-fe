import React from 'react';
import styled from 'styled-components';

function LowerNavBar() {
  return (
    <StyledNav className="navbar">
      <StyledOl>
        <li>Cloths</li>
        <li>Mens</li>
        <li>Household</li>
        <li>Books</li>
        <li>Fine Things</li>
        <li>Plants</li>
      </StyledOl>
    </StyledNav>
  );
}
const StyledNav = styled.nav`
  position: sticky;
  top: 2.5em;
  z-index: 1;
  border-bottom: 5px solid var(--backdrop-color);
  border-top: 2px solid #2e4926;
`;

const StyledOl = styled.ol`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  list-style: none;
`;
export default LowerNavBar;
