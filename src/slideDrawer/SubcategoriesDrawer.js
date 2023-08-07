import React from 'react';
import { CSSTransition } from 'react-transition-group';
import DrawerItem from './DrawerItem';
import styled from 'styled-components';

function SubcategoriesDrawer({ setShowCategory, data, categoryId, toggle }) {
  return (
    <CSSTransition
      appear={true}
      classNames="slide-subcategories"
      in={true}
      timeout={3000}
    >
      <StyledDivContainer className="slide-subcategories">
        <DrawerItem
          arrowClickHandler={() => setShowCategory(true)}
          id={-1}
          itemName="Categories"
        />
        {data.categoriesList
          .find((x) => x.id === categoryId)
          .subcategoriesList.map((sub) => (
            <DrawerItem
              key={`subcategoryId${sub.id}`}
              toggle={toggle}
              id={sub.id}
              itemName={sub.name}
            />
          ))}
      </StyledDivContainer>
    </CSSTransition>
  );
}

export default SubcategoriesDrawer;
const StyledDivContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
