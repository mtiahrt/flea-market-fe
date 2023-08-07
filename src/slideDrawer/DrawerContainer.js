import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../queries/graphQL';
import CategoryDrawer from './CategoryDrawer';
import SubcategoriesDrawer from './SubcategoriesDrawer';

function DrawerContainer({ show, toggle }) {
  const { loading, error, data } = useQuery(GET_CATEGORIES, {});
  const [showCategory, setShowCategory] = useState(true);
  const [categoryIdSelected, setCategoryId] = useState(null);

  console.log('Slide drawer container rendered');
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (!show) return null;

  if (showCategory) {
    return (
      <CategoryDrawer
        showCategory={showCategory}
        setShowCategory={setShowCategory}
        setCategoryId={setCategoryId}
        toggle={toggle}
        data={data}
      />
    );
  }
  if (!showCategory) {
    return (
      <SubcategoriesDrawer
        setShowCategory={setShowCategory}
        categoryId={categoryIdSelected}
        data={data}
      />
    );
  }
  return <div>Something is wrong</div>;
}

export default DrawerContainer;
