import React from 'react';
import styled from 'styled-components';

function Backdrop({ close }) {
  return <StyledDiv onClick={() => close()} className="backdrop"></StyledDiv>;
}
const StyledDiv = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  right: 0;
`;

export default Backdrop;
