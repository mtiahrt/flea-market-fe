import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../queries/graphQL';
import CategoryDrawer from './CategoryDrawer';
import SubcategoriesDrawer from './SubcategoriesDrawer';
import { CSSTransition } from 'react-transition-group';

function DrawerContainer({ drawerOpen }) {
  const { loading, error, data } = useQuery(GET_CATEGORIES, {});
  const [showCategory, setShowCategory] = useState(true);
  const [categoryIdSelected, setCategoryId] = useState(null);
  console.log('Slide drawer container rendered');
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <CSSTransition
      in={drawerOpen}
      classNames="side-drawer"
      appear={true}
      timeout={200}
    >
      <div className="side-drawer">
        {showCategory ? (
          <CategoryDrawer
            showCategory={showCategory}
            setShowCategory={setShowCategory}
            setCategoryId={setCategoryId}
            data={data}
          />
        ) : (
          <SubcategoriesDrawer
            setShowCategory={setShowCategory}
            categoryId={categoryIdSelected}
            data={data}
          />
        )}
      </div>
    </CSSTransition>
  );
}

export default DrawerContainer;
