import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../queries/graphQL';
import { Link } from 'react-router-dom';
import DropdownMenu from './DropdownMenu';
import './LowerNavBar.css';

function LowerNavBar() {
  const { loading, error, data } = useQuery(GET_CATEGORIES, {});
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownMenuID, setDropdownMenuID] = useState(-1);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const handleMouseEnter = (e, id) => {
    setDropdownMenuID(id);
    setDropdownVisible(true);
  };

  const handleMouseLeave = (e, id) => {
    setDropdownVisible(false);
  };
  return (
    <StyledNav className="navbar">
      <StyledOl>
        {data?.categoriesList.map((cat) => (
          <Link to={`/inventory/category/?categoryId=${cat.id}`}>
            <li
              key={cat.id}
              className="menu"
              onMouseEnter={(e) => handleMouseEnter(e, cat.id)}
              onMouseLeave={(e) => handleMouseLeave(e, cat.id)}
            >
              {cat.name}
              {isDropdownVisible && cat.id === dropdownMenuID && (
                <DropdownMenu
                  className="dropdown-lower-nav"
                  items={data.categoriesList
                    .filter((x) => x.id === dropdownMenuID)
                    .map((x) =>
                      x.subcategoriesList.map((y) => ({
                        id: y.id,
                        content: y.name,
                        url: `/inventory/subcategory/?categoryId=${x.id}&subcategoryId=${y.id}`,
                      }))
                    )
                    .find((x) => x)}
                />
              )}
            </li>
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
  z-index: 1;
  @media (max-width: 52em) {
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
