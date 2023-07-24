import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../queries/graphQL';
import { Link } from 'react-router-dom';

function LowerNavBar() {
  const { loading, error, data } = useQuery(GET_CATEGORIES, {});
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <StyledNav className="navbar">
      <StyledOl>
        {data?.categoriesList.map((cat) => (
          <Link to={`/inventory/${cat.id}`}>
            <li key={`categoryId${cat.id}`}>{cat.name}</li>
          </Link>
        ))}
      </StyledOl>
    </StyledNav>
  );
}
const StyledNav = styled.nav`
  position: sticky;
  top: 2.5em;
  border-bottom: 5px solid var(--backdrop-color);
  border-top: 2px solid #2e4926;
  @media (max-width: 40em) {
    display: none;
  }
`;

const StyledOl = styled.ol`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  list-style: none;
`;
export default LowerNavBar;
