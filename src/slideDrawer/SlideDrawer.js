import React from 'react';
import './SlideDrawer.css';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../queries/graphQL';
import { Link } from 'react-router-dom';

function SlideDrawer({ toggle, show }) {
  const { loading, error, data } = useQuery(GET_CATEGORIES, {});
  console.log('Slide drawer rendered');
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className={`side-drawer ${show ? 'open' : ''}`}>
      <StyledDiv>
        {data?.categoriesList.map((cat) => (
          <Link onClick={() => toggle()} to={`/inventory/${cat.id}`}>
            <StyledH4 key={`sliderCategoryId${cat.id}`}>{cat.name}</StyledH4>
          </Link>
        ))}
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
