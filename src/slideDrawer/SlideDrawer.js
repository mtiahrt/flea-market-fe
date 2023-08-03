import React from 'react';
import './SlideDrawer.css';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../queries/graphQL';
import { Link } from 'react-router-dom';
import { ReactComponent as ChevronRight } from '../icons/chevron-right.svg';

function SlideDrawer({ toggle, show }) {
  const { loading, error, data } = useQuery(GET_CATEGORIES, {});
  console.log('Slide drawer rendered');
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className={`side-drawer ${show ? 'open' : ''}`}>
      <StyledDivContainer>
        {data?.categoriesList.map((cat) => (
          <Link onClick={() => toggle()} to={`/inventory/${cat.id}`}>
            <StyledDivRow>
              <StyledH4 key={`sliderCategoryId${cat.id}`}>{cat.name}</StyledH4>
              <ChevronRight />
            </StyledDivRow>
          </Link>
        ))}
      </StyledDivContainer>
    </div>
  );
}
const StyledDivRow = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  border-top: 0.1rem solid #e1e1e1;
`;
const StyledDivContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledH4 = styled.h4`
  color: var(--text-color-body);
  cursor: pointer;
  margin: 1rem;
  text-align: left;
  text-transform: uppercase;
`;

export default SlideDrawer;
