import React from 'react';
import DrawerItem from './DrawerItem';
import styled from 'styled-components';

function SubcategoriesDrawer({ setShowCategory, data, categoryId, toggle }) {
  return (
    <StyledDivContainer className="subcategories-drawer">
      <DrawerItem
        arrowClickHandler={() => setShowCategory(true)}
        className="back-to-categories"
        id={-1}
        itemName="Categories"
        arrowLeft={true}
      />
      {data.categoriesList
        .find((x) => x.id === categoryId)
        .subcategoriesList.map((sub) => (
          <DrawerItem
            route="subcategory"
            key={`subcategoryId${sub.id}`}
            toggle={toggle}
            id={sub.id}
            itemName={sub.name}
          />
        ))}
    </StyledDivContainer>
  );
}

export default SubcategoriesDrawer;
const StyledDivContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
