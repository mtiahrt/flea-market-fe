import { createContext, useContext, useEffect, useState } from 'react';
import CartContextModel from '../models/CartContextModel';
import { useLazyQuery } from '@apollo/client';
import { GET_CART_ITEMS } from '../queries/graphQL';
const CartContext = createContext();

export function useCart() {
  const contextValue = useContext(CartContext);
  if (!CartContext) {
    throw new Error(
      'useCartContext must be called from within an CartContextProvider'
    );
  }
  return contextValue;
}
export function CartContextProvider(props) {
  const [getCartItems] = useLazyQuery(GET_CART_ITEMS);
  useEffect(async () => {
    getCartItems({
      variables: { user_id: props.userId },
    }).then(({ data }) => loadCartItems(data.cartsList));
  }, []);
  const [cartItems, setCartItems] = useState(undefined);

  function addToCart(inventoryId, quantity, crudFn) {
    crudFn().then(
      //destructure 3 levels
      ({
        data: {
          createCart: { cart },
        },
      }) => {
        const cartContextModel = new CartContextModel(
          cart.id,
          inventoryId,
          cart.quantity,
          cart.inventory.price
        );
        setCartItems(
          cartItems ? [...cartItems, cartContextModel] : [cartContextModel]
        );
      }
    );
  }
  function removeFromCart(cartId, crudFn) {
    crudFn().then(() =>
      setCartItems(cartItems?.filter((x) => x.cartId !== cartId))
    );
  }
  function loadCartItems(items) {
    setCartItems(
      items.map(
        (item) =>
          new CartContextModel(
            item.id,
            item.inventoryId,
            item.quantity,
            item.inventory.price
          )
      )
    );
  }
  function updateQuantity(cartId, inventoryId, quantity, curdFn) {
    curdFn().then((res) => {
      const cartContextModel = new CartContextModel(
        cartId,
        inventoryId,
        res.data.updateCart.cart.quantity,
        cartItems?.find((x) => x.cartId === cartId).price
      );
      const updatedItems = [
        ...cartItems?.filter((x) => x.cartId !== cartId),
        cartContextModel,
      ];
      setCartItems(updatedItems);
    });
  }

  const items = cartItems ? [...cartItems] : null;
  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
  };
  return <CartContext.Provider value={value} {...props} />;
}
