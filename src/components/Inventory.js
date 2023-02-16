import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import BasicCard from './BasicCard';
import { INVENTORY_LIST } from '../queries/graphQL';
import { UserProfileContext } from '../contexts/UserContext';
import { useCart } from '../contexts/CartContext';
import CartContextModel from '../models/CartContextModel';
import InventoryFilter from './InventoryFilter';

const Inventory = () => {
  const [filter, setFilter] = useState({
    categoryId: [],
    subcategoryId: [],
  });
  const { userProfile } = useContext(UserProfileContext);
  const { loadCartItems } = useCart();
  const { loading, error, data } = useQuery(INVENTORY_LIST, {
    variables: {
      applicationUserId: userProfile.id,
    },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    console.log('Item List use effect fired...');
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
  }, [userProfile.isLoggedIn]);

  const filterFunction = (inventoryItem) => {
    if (filter.categoryId.length === 0 && filter.subcategoryId.length === 0) {
      return true;
    }
    return (
      filter.categoryId.includes(inventoryItem.subcategory.categoryId) &&
      filter.subcategoryId.includes(inventoryItem.subcategoryId)
    );
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log('Item List data is :', data);
  return (
    <>
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
      <InventoryFilter filter={filter} setFilter={setFilter} />
    </>
  );
};
const StyledInventory = styled.div`
  display: grid;
  margin: 25px;
  gap: 25px;
  grid-template-columns: repeat(auto-fit, minmax(19rem, 1fr));
  justify-items: center;
`;
export default Inventory;
