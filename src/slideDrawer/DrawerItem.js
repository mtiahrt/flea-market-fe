import React from 'react';
import { ReactComponent as ChevronRight } from '../icons/chevron-right.svg';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function DrawerItem({ arrowClickHandler, id, itemName }) {
  const handleArrowClick = (e) => {
    arrowClickHandler();
  };
  return (
    <StyledDivRow>
      <Link to={`/inventory/${id}`}>
        <StyledH4>{itemName}</StyledH4>
      </Link>
      <ChevronRight onClick={handleArrowClick} />
    </StyledDivRow>
  );
}

export default DrawerItem;

const StyledH4 = styled.h4`
  color: var(--text-color-body);
  cursor: pointer;
  margin: 1rem;
  text-align: left;
  text-transform: uppercase;
`;

const StyledDivRow = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  border-top: 0.1rem solid #e1e1e1;
`;
