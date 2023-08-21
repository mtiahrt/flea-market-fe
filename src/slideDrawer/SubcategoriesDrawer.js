import React from 'react';
import DrawerItem from './DrawerItem';
import styled from 'styled-components';

function SubcategoriesDrawer({
  setShowCategory,
  data,
  categoryId,
  toggleDrawer,
}) {
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
            toggleDrawer={toggleDrawer}
            route="subcategory"
            queryParameters={`?categoryId=${categoryId}&subcategoryId=${sub.id}`}
            key={`subcategoryId${sub.id}`}
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
