import React from 'react';
import './SlideDrawer.css';
import styled from 'styled-components';
import DrawerItem from './DrawerItem';
import { CSSTransition } from 'react-transition-group';

function CategoryDrawer({
  data,
  toggle,
  showCategory,
  setShowCategory,
  setCategoryId,
}) {
  console.log('category drawer rendered');

  return (
    <CSSTransition
      classNames="side-drawer"
      in={showCategory}
      timeout={300}
      appear={true}
    >
      <div className="side-drawer">
        <StyledDivContainer>
          {data?.categoriesList.map((cat) => (
            <DrawerItem
              arrowClickHandler={() => {
                setShowCategory(false);
                setCategoryId(cat.id);
              }}
              key={`categoryId${cat.id}`}
              toggle={toggle}
              id={cat.id}
              itemName={cat.name}
            />
          ))}
        </StyledDivContainer>
      </div>
    </CSSTransition>
  );
}
const StyledDivContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default CategoryDrawer;
