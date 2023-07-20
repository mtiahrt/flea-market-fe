import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../queries/graphQL';

function LowerNavBar() {
  const { loading, error, data } = useQuery(GET_CATEGORIES, {});
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <StyledNav className="navbar">
      <StyledOl>
        {data?.categoriesList.map((cat) => (
          <li key={`categoryId${cat.id}`}>{cat.name}</li>
        ))}
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
