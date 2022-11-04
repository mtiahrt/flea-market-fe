import React, { useContext } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import styled from 'styled-components';
import BasicCard from './BasicCard';
import { CARD_ITEM, DELETE_CART_ITEM, ADD_CART_ITEM } from '../queries/graphQL';
import { UserProfileContext } from '../Contexts/LoginContext';

const ItemList = () => {
  const { cartItems, setCartItems, userProfile } = useContext(UserProfileContext);
  const { loading, error, data } = useQuery(CARD_ITEM, {
    variables: { userId: userProfile.uid }
  });
  const [deleteCartItem, {
    loading: loadingDeleteCartItem, error: errorDeleteCartItem, data: dataDeleteCartItem
  }] = useMutation(DELETE_CART_ITEM);
  const [addCartItem, {
    loading: loadingAddCartItem, error: errorAddCartItem, data: dataAddCartItem
  }] = useMutation(ADD_CART_ITEM);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log('data is :', data);

  function isItemAlreadyInCart(id) {
    if (cartItems && cartItems.includes(id)) {
      return true;
    }
  }

  function updateCart(e, id) {
    isItemAlreadyInCart(id)
      ? removeItemFromCart(id,e)
      : addItemToCart(+id);
  }

  function addItemToCart(saleItemId, e) {
    addCartItem({
      variables: {
        saleItemId,
        userId: userProfile.uid
      }
    }).then(setCartItems((prev) => [...prev, saleItemId]));
  }

  function removeItemFromCart(id,e) {
    const cartId = +e.currentTarget.parentElement.parentElement.getAttribute('data-cart-id');
    deleteCartItem({
      variables: {
        id: cartId
      }
    });
    setCartItems((prev) => prev.filter(item => item !== id));
  }

  return (
    <StyledList className='item-list'>
      {data.saleItemsList.map((item) => (
        <BasicCard
          cartId={item.cartsList[0]?.id}
          key={`card${item.id.toString()}`}
          iconColor={isItemAlreadyInCart(item.id) ? 'primary' : 'disabled'}
          link={`DetailedItem/${item.id}`} cardData={item}
          cartClickHandler={e => updateCart(e, item.id)}
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
`;
export default ItemList;
