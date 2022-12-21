import React, { useContext, useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import styled from 'styled-components';
import BasicCard from './BasicCard';
import { INVENTORY_LIST } from '../queries/graphQL';
import { UserProfileContext } from '../Contexts/UserContext';
import { CartContext } from '../Contexts/CartContext';

const ItemList = () => {
  const { userProfile } = useContext(UserProfileContext);
  const { cartItems, setCartItems } = useContext(CartContext);
  const { loading, error, data, refetch } = useQuery(INVENTORY_LIST, {
    variables: {
      applicationUserId: userProfile.id,
    },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    console.log('Item List use effect fired...');
    if (data?.inventoriesList && userProfile.isLoggedIn) {
      setCartItems(
        data?.inventoriesList
          ?.filter((item) => item.cartsList.length)
          .map((item) => item.cartsList[0].inventoryId)
      );
    }
  }, [userProfile.isLoggedIn, data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log('Item List data is :', data);
  function isItemAlreadyInCart(id) {
    if (cartItems && cartItems.includes(id)) {
      return true;
    }
    return false;
  }

  return (
    <StyledList className="item-list">
      {data.inventoriesList.map((item) => (
        <BasicCard
          key={`card${item.id.toString()}`}
          isInCart={isItemAlreadyInCart(item.id)}
          link={`DetailedItem/${item.id}`}
          inventoryItem={item}
        ></BasicCard>
      ))}
    </StyledList>
  );
};
const StyledList = styled.div`
  display: grid;
  margin: 25px;
  gap: 25px;
  grid-template-columns: repeat(auto-fit, minmax(19rem, 1fr));
  justify-items: center;
`;
export default ItemList;
