import { useContext } from 'react';
import { UserProfileContext } from '../Contexts/UserContext';
import { useMutation } from '@apollo/client';
import { ADD_CART_ITEM, DELETE_CART_ITEM } from '../queries/graphQL';
import { CartContext } from '../Contexts/CartContext';
import CartContextModel from '../models/CartContextModel';

export default function useCart() {
  const { setCartItems } = useContext(CartContext);
  const { userProfile } = useContext(UserProfileContext);
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

  function setRemoveItemFromCart(cartId) {
    deleteCartItem({
      variables: {
        id: cartId,
      },
    }).then(() =>
      setCartItems((prev) => prev.filter((item) => item.id !== cartId))
    );
  }

  function setAddItemToCart(inventoryId, quantity) {
    addCartItem({
      variables: {
        inventoryId: inventoryId,
        quantity: quantity ? quantity : 1,
        userId: userProfile.id,
      },
    }).then((res) => {
      console.log(res);
      new CartContextModel(
        res.data.createCart.cart.id,
        res.data.createCart.cart.quantity,
        res.data.createCart.cart.price
      );
    });
  }
  return [setAddItemToCart, setRemoveItemFromCart];
}
