import React from 'react';
import './SlideDrawer.css';
import styled from 'styled-components';

function SlideDrawer({ show }) {
  console.log('Slide drawer rendered');
  return (
    <div className={`side-drawer ${show ? 'open' : ''}`}>
      <StyledDiv>
        <StyledH4>Clothing</StyledH4>
        <StyledH4>Jewelry</StyledH4>
        <StyledH4>Kids</StyledH4>
      </StyledDiv>
    </div>
  );
}

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledH4 = styled.h4`
  cursor: pointer;
  margin: 0;
  padding: 1.2rem 2.5rem;
  border-top: 0.1rem solid #e1e1e1;
  text-align: left;
  text-transform: uppercase;
`;

export default SlideDrawer;
