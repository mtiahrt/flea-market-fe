import React, { useContext, useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import styled from 'styled-components';
import BasicCard from './BasicCard';
import {
  INVENTORY_LIST,
  DELETE_CART_ITEM,
  ADD_CART_ITEM,
} from '../queries/graphQL';
import { UserProfileContext } from '../Contexts/LoginContext';

const ItemList = () => {
  const { cartItems, setCartItems, userProfile } =
    useContext(UserProfileContext);
  const { loading, error, data, refetch } = useQuery(INVENTORY_LIST, {
    variables: {
      userId: userProfile.uid,
    },
    fetchPolicy: 'cache-and-network',
  });
  const [
    deleteCartItem,
    {
      loading: loadingDeleteCartItem,
      error: errorDeleteCartItem,
      data: dataDeleteCartItem,
    },
  ] = useMutation(DELETE_CART_ITEM);
  const [
    addCartItem,
    {
      loading: loadingAddCartItem,
      error: errorAddCartItem,
      data: dataAddCartItem,
    },
  ] = useMutation(ADD_CART_ITEM);

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
  }

  return (
    <StyledList className="item-list">
      {data.inventoriesList.map((item) => (
        <BasicCard
          key={`card${item.id.toString()}`}
          iconColor={isItemAlreadyInCart(item.id) ? 'primary' : 'disabled'}
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
