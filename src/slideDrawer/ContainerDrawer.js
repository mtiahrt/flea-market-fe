import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../queries/graphQL';
import CategoryDrawer from './CategoryDrawer';
import SubcategoriesDrawer from './SubcategoriesDrawer';
import { CSSTransition } from 'react-transition-group';

function ContainerDrawer({ drawerOpen, toggleDrawer }) {
  const { loading, error, data } = useQuery(GET_CATEGORIES, {});
  const [showCategory, setShowCategory] = useState(true);
  const [categoryIdSelected, setCategoryId] = useState(null);
  console.log('Slide drawer container rendered');
  const drawerTiming = 500;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <CSSTransition
      in={drawerOpen}
      classNames="side-drawer"
      appear={true}
      timeout={drawerTiming}
    >
      <div className="side-drawer">
        <CSSTransition
          in={showCategory}
          classNames="categories-drawer"
          timeout={drawerTiming}
          unmountOnExit
        >
          <CategoryDrawer
            toggleDrawer={toggleDrawer}
            showCategory={showCategory}
            setShowCategory={setShowCategory}
            setCategoryId={setCategoryId}
            data={data}
          />
        </CSSTransition>
        <CSSTransition
          in={!showCategory}
          classNames="subcategories-drawer"
          timeout={drawerTiming}
          unmountOnExit
        >
          <SubcategoriesDrawer
            toggleDrawer={toggleDrawer}
            setShowCategory={setShowCategory}
            categoryId={categoryIdSelected}
            data={data}
          />
        </CSSTransition>
      </div>
    </CSSTransition>
  );
}

export default ContainerDrawer;
