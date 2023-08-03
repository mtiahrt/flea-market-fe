import React, { useState } from 'react';
import './SlideDrawer.css';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../queries/graphQL';
import DrawerItem from './DrawerItem';

function SlideDrawer({ toggle, show }) {
  const [subcategoryIdSelected, setSubcategoryIdSelected] = useState(null);
  const { loading, error, data } = useQuery(GET_CATEGORIES, {});
  console.log('Slide drawer rendered');
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className={`side-drawer ${show ? 'open' : ''}`}>
      {!subcategoryIdSelected && (
        <StyledDivContainer>
          {data?.categoriesList.map((cat) => (
            <DrawerItem
              key={`categoryId${cat.id}`}
              setSubcategoryIdSelected={setSubcategoryIdSelected}
              toggle={toggle}
              id={cat.id}
              itemName={cat.name}
            />
          ))}
        </StyledDivContainer>
      )}
      {subcategoryIdSelected && (
        <StyledDivContainer className="slide-subcategories">
          {data.categoriesList
            .find((x) => x.id === subcategoryIdSelected)
            .subcategoriesList.map((sub) => (
              <DrawerItem
                key={`subcategoryId${sub.id}`}
                toggle={toggle}
                id={sub.id}
                itemName={sub.name}
              />
            ))}
        </StyledDivContainer>
      )}
    </div>
  );
}
const StyledDivContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default SlideDrawer;
