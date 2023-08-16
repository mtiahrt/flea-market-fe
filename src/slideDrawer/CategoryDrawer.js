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
          arrowClickHandler={() => {
            setShowCategory(false);
            setCategoryId(cat.id);
          }}
          route="category"
          toggleDrawer={toggleDrawer}
          arrowRight={true}
          key={`categoryId${cat.id}`}
          id={cat.id}
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
