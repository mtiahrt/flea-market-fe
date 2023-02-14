import React, { useContext, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import BasicCard from './BasicCard';
import { INVENTORY_LIST } from '../queries/graphQL';
import { UserProfileContext } from '../contexts/UserContext';
import { useCart } from '../contexts/CartContext';
import CartContextModel from '../models/CartContextModel';
import InventoryFilter from './InventoryFilter';

const Inventory = () => {
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

  if (loading) return <p role="loading">Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log('Item List data is :', data);
  return (
    <>
      <StyledInventory role="item-list">
        {data.inventoriesList.map((item) => (
          <BasicCard
            key={`card${item.id.toString()}`}
            isItemInCart={item.cartsList.length ? true : false}
            link={`DetailedItem/${item.id}`}
            inventoryItem={item}
          ></BasicCard>
        ))}
      </StyledInventory>
      <InventoryFilter />
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