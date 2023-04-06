import React, { useContext, useEffect, useReducer, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import BasicCard from './BasicCard';
import { INVENTORY_LIST } from '../queries/graphQL';
import { UserProfileContext } from '../contexts/UserContext';
import { useCart } from '../contexts/CartContext';
import CartContextModel from '../models/CartContextModel';
import InventoryFilter from './InventoryFilter';
import filterReducer from './InventoryFilterReducer';
import { ReactComponent as FilterIcon } from '../icons/filter-solid.svg';

const Inventory = () => {
  const [state, dispatch] = useReducer(filterReducer, []);
  const { userProfile } = useContext(UserProfileContext);
  const { loadCartItems } = useCart();
  const { loading, error, data } = useQuery(INVENTORY_LIST, {
    variables: {
      applicationUserId: userProfile.id,
    },
    fetchPolicy: 'cache-and-network',
  });
  const categories = useMemo(() => reduceCategories(data), [data]);

  useEffect(() => {
    console.log('Inventory use effect fired...');
    if (data?.inventoriesList && userProfile.isLoggedIn) {
      loadCartItems(
        data?.inventoriesList
          ?.filter((item) => item.cartsList.length)
          .map(
            (item) =>
              new CartContextModel(
                item.cartsList[0].id,
                item.cartsList[0].quantity,
                item.price
              )
          )
      );
    }
  }, [userProfile.isLoggedIn, data]);

  const filterFunction = (inventoryItem) => {
    return state.length === 0
      ? true
      : state.some(
          (x) =>
            x.categoryId === inventoryItem.subcategory.category.id &&
            x.subcategoryIds.includes(inventoryItem.subcategoryId)
        );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log('Inventory is rendering');

  function reduceCategories(data) {
    if (!data) {
      return [];
    }
    console.log('reduce fired');
    const categoriesMap = data.inventoriesList.reduce((map, item) => {
      const categoryId = item.subcategory.category.id;
      const subcategoryId = item.subcategory.id;

      if (!map.has(categoryId)) {
        map.set(categoryId, {
          id: categoryId,
          name: item.subcategory.category.name,
          subcategories: [],
        });
      }

      const category = map.get(categoryId);
      if (!category.subcategories.some((x) => x.id === subcategoryId)) {
        category.subcategories.push({
          id: subcategoryId,
          name: item.subcategory.name,
        });
      }

      return map;
    }, new Map());

    return Array.from(categoriesMap.values());
  }
  return (
    <>
      <StyledFilterIcon name="filter" />
      <StyledDiv>
        <InventoryFilter
          categories={categories ? categories : []}
          dispatchFilter={dispatch}
        />
        <StyledInventory role="item-list">
          {data.inventoriesList.filter(filterFunction).map((item) => (
            <BasicCard
              key={`card${item.id.toString()}`}
              isItemInCart={item.cartsList.length ? true : false}
              link={`DetailedItem/${item.id}`}
              inventoryItem={item}
            ></BasicCard>
          ))}
        </StyledInventory>
      </StyledDiv>
    </>
  );
};
const StyledFilterIcon = styled(FilterIcon)`
  --button-size: calc(var(--nav-size) * 0.7);
  width: var(--button-size);
  height: var(--button-size);
  border-radius: 50%;
  padding: 5px;
  margin: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: filter 300ms;
  fill: rgba(0, 0, 0, 0.26);
  cursor: pointer;
`;
const StyledDiv = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: row;
`;
const StyledInventory = styled.div`
  display: grid;
  width: 100%;
  gap: 25px;
  grid-template-columns: repeat(auto-fit, minmax(19rem, 0.7fr));
  justify-items: center;
`;
export default Inventory;
