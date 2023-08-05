import React, { useState } from 'react';
import './SlideDrawer.css';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../queries/graphQL';
import DrawerItem from './DrawerItem';
import { CSSTransition } from 'react-transition-group';

function SlideDrawer({ toggle, show }) {
  const [subcategoryIdSelected, setSubcategoryIdSelected] = useState(null);
  const [openSubcategories, setOpenSubcategories] = useState(false);

  const { loading, error, data } = useQuery(GET_CATEGORIES, {});
  console.log('Slide drawer rendered');
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <CSSTransition classNames="side-drawer" timeout={300} in={show}>
      <div className="side-drawer">
        <button
          onClick={() => {
            setSubcategoryIdSelected(5);
            setOpenSubcategories(!openSubcategories);
          }}
        />
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
          <CSSTransition
            appear={true}
            classNames="slide-subcategories"
            in={openSubcategories}
            timeout={3000}
          >
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
          </CSSTransition>
        )}
      </div>
    </CSSTransition>
  );
}
const StyledDivContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default SlideDrawer;
