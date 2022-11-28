import React, { useContext, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import styled from 'styled-components';
import BasicCard from './BasicCard';
import { CARD_ITEM, DELETE_CART_ITEM, ADD_CART_ITEM } from '../queries/graphQL';
import { UserProfileContext } from '../Contexts/LoginContext';

const ItemList = () => {
  const { cartItems, setCartItems, userProfile } = useContext(UserProfileContext);
  const { loading, error, data, refetch } = useQuery(CARD_ITEM, {
    variables: {
      userId: userProfile.uid
    },
    fetchPolicy: 'cache-and-network'
  });
  const [deleteCartItem, {
    loading: loadingDeleteCartItem, error: errorDeleteCartItem, data: dataDeleteCartItem
  }] = useMutation(DELETE_CART_ITEM);
  const [addCartItem, {
    loading: loadingAddCartItem, error: errorAddCartItem, data: dataAddCartItem
  }] = useMutation(ADD_CART_ITEM);

  console.log('Item List is Rendering...');
  console.log('Item List data is :', data);

  useEffect(() => {
    console.log('Item List use effect fired...');
    if (data?.inventoriesList && userProfile.isLoggedIn) {
      const inventoryInCart = data?.inventoriesList?.filter(item => item.cartsList.length).map(item => item.cartsList[0].inventoryId);
      setCartItems((prev) => [...new Set([...prev, ...inventoryInCart])]);
    }
  }, [userProfile.isLoggedIn, data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  function isItemAlreadyInCart(id) {
    if (cartItems && cartItems.includes(id)) {
      return true;
    }
  }

  function updateCart(cartItemId, inventoryId) {
    isItemAlreadyInCart(inventoryId)
      ? removeItemFromCart(cartItemId, inventoryId)
      : addItemToCart(+inventoryId);
  }

  function addItemToCart(inventoryId) {
    addCartItem({
      variables: {
        inventoryId: inventoryId,
        userId: userProfile.uid
      }
    }).then(() => {
        refetch().then(() => console.log('re-fetch complete', data));
      }
    );
  }

  function removeItemFromCart(cartItemId, inventoryId) {
    deleteCartItem({
      variables: {
        id: cartItemId
      }
    });
    setCartItems((prev) => prev.filter(item => item !== inventoryId));
  }

  return (
    <StyledList className='item-list'>
      {data.inventoriesList.map((item) => (
        <BasicCard
          key={`card${item.id.toString()}`}
          iconColor={isItemAlreadyInCart(item.id) ? 'primary' : 'disabled'}
          link={`DetailedItem/${item.id}`}
          cartItem={item}
          cartClickHandler={updateCart}
        >
        </BasicCard>
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
