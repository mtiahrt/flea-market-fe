import { createContext, useContext, useState } from 'react';
import CartContextModel from '../models/CartContextModel';

const CartContext = createContext(null);

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
  const [cartItems, setCartItems] = useState([new CartContextModel()]);

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
          cart.quantity,
          cart.inventory.price
        );
        setCartItems([...cartItems, cartContextModel]);
      }
    );
  }
  function removeFromCart(cartId, crudFn) {
    crudFn().then(() => setCartItems(cartItems.filter((x) => x.id !== cartId)));
  }
  function loadCartItems(items) {
    setCartItems(items);
  }
  function updateQuantity(cartId, quantity, curdFn) {
    curdFn().then((res) => {
      const cartContextModel = new CartContextModel(
        cartId,
        res.data.updateCart.cart.quantity,
        cartItems.find((x) => x.cartId === cartId).price
      );
      const updatedItems = [
        ...cartItems.filter((x) => x.cartId !== cartId),
        cartContextModel,
      ];
      setCartItems(updatedItems);
    });
  }

  const items = [...cartItems];
  const value = {
    items,
    loadCartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
  };
  return <CartContext.Provider value={value} {...props} />;
}
