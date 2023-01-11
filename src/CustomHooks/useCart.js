import { useContext } from 'react';
import { UserProfileContext } from '../Contexts/UserContext';
import { useMutation } from '@apollo/client';
import {
  ADD_CART_ITEM,
  DELETE_CART_ITEM,
  UPDATE_CART_QUANTITY,
} from '../queries/graphQL';
import { CartContext } from '../Contexts/CartContext';
import CartContextModel from '../models/CartContextModel';

export default function useCart() {
  const { cartItems, setCartItems } = useContext(CartContext);
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

  const [
    updateCartQuantity,
    {
      loading: loadingUpdateCartQuantity,
      error: errorUpdateCartQuantity,
      data: dataUpdateCartQuantity,
    },
  ] = useMutation(UPDATE_CART_QUANTITY);

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
    }).then(
      //destructure 3 levels
      ({
        data: {
          createCart: { cart },
        },
      }) => {
        const cartContextModel = new CartContextModel(
          cart.id,
          cart.quantity,
          cart.inventory.price
        );
        setCartItems((prev) => [...prev, cartContextModel]);
      }
    );
  }
  function setQuantityInCart(cartId, quantity) {
    updateCartQuantity({
      variables: {
        id: cartId,
        quantity: quantity,
      },
    }).then((res) => {
      const cartContextModel = new CartContextModel(
        cartId,
        res.data.updateCart.cart.quantity,
        cartItems.find((x) => x.cartId === cartId).price
      );
      setCartItems((prev) => [
        ...prev.filter((x) => x.cartId !== cartId),
        cartContextModel,
      ]);
    });
  }
  return [setAddItemToCart, setQuantityInCart, setRemoveItemFromCart];
}
