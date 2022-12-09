import { useContext } from 'react';
import { UserProfileContext } from '../Contexts/LoginContext';
import { useMutation } from '@apollo/client';
import { ADD_CART_ITEM, DELETE_CART_ITEM } from '../queries/graphQL';

export default function useCart(id) {
  const [
    addCartItem,
    {
      loading: loadingAddCartItem,
      error: errorAddCartItem,
      data: dataAddCartItem,
    },
  ] = useMutation(ADD_CART_ITEM);
  const [
    deleteCartItem,
    {
      loading: loadingDeleteCartItem,
      error: errorDeleteCartItem,
      data: dataDeleteCartItem,
    },
  ] = useMutation(DELETE_CART_ITEM);
  const { cartItems, setCartItems, userProfile } =
    useContext(UserProfileContext);

  const setCartItem = (inventoryId, cartId) => {
    isItemAlreadyInCart(inventoryId)
      ? removeItemFromCart(inventoryId, cartId)
      : addItemToCart(inventoryId);
  };

  function isItemAlreadyInCart(id) {
    if (cartItems && cartItems.includes(id)) {
      return true;
    }
  }

  function removeItemFromCart(inventoryId, cartId) {
    deleteCartItem({
      variables: {
        id: cartId,
      },
    }).then(() =>
      setCartItems((prev) => prev.filter((item) => item !== inventoryId))
    );
  }

  function addItemToCart(inventoryId) {
    addCartItem({
      variables: {
        inventoryId: inventoryId,
        quantity: 1,
        userId: userProfile.uid,
      },
    }).then((resp) => {
      console.log(resp);
      setCartItems([...cartItems, id]);
      // refetch().then(() => console.log('re-fetch complete', data));
    });
  }
  return [setCartItem];
}
