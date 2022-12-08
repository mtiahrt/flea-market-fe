import { useState, useContext } from 'react';
import { UserProfileContext } from '../Contexts/LoginContext';

function isItemAlreadyInCart(id, cartItems) {
  if (cartItems && cartItems.includes(id)) {
    return true;
  }
}

export default function useCart(id) {
  // debugger;
  const { cartItems, setCartItems } = useContext(UserProfileContext);
  const x = isItemAlreadyInCart(id);

  return [cartItems];
}
