import React from 'react';
import './SlideDrawer.css';
import styled from 'styled-components';
import DrawerItem from './DrawerItem';

function CategoryDrawer({
  data,
  setShowCategory,
  setCategoryId,
  toggleDrawer,
}) {
  console.log('category drawer rendered');

  return (
    <StyledDivContainer className="categories-drawer">
      {data?.categoriesList.map((cat) => (
        <DrawerItem
          key={`categoryId${cat.id}`}
          arrowClickHandler={() => {
            setShowCategory(false);
            setCategoryId(cat.id);
          }}
          queryParameters={`?categoryId=${cat.id}`}
          route="category"
          toggleDrawer={toggleDrawer}
          arrowRight={true}
          itemName={cat.name}
        />
      ))}
    </StyledDivContainer>
  );
}
const StyledDivContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default CategoryDrawer;
