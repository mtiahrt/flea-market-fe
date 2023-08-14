import React from 'react';
import { ReactComponent as ChevronRight } from '../icons/chevron-right.svg';
import { ReactComponent as ChevronLeft } from '../icons/chevron-left.svg';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function DrawerItem({
  arrowClickHandler,
  toggleDrawer,
  id,
  itemName,
  arrowLeft,
  arrowRight,
  className,
}) {
  const handleArrowClick = (e) => {
    arrowClickHandler();
  };
  return (
    <StyledDivRow className={className}>
      {arrowLeft && <ChevronLeft onClick={handleArrowClick} />}
      <Link onClick={toggleDrawer} to={`/inventory/${id}`}>
        <StyledH4>{itemName}</StyledH4>
      </Link>
      {arrowRight && <ChevronRight onClick={handleArrowClick} />}
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
  border-top: 0.1rem solid #e1e1e1;
`;
