import React, { useContext, useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation } from '@apollo/client';
import { useCart } from '../../contexts/CartContext';
import { DELETE_CART_ITEM, UPDATE_CART_QUANTITY } from '../../queries/graphQL';
import { Snackbar } from '../shared/Snackbar';
import { useSnackbar } from '../../hooks/useSnackbar';

const ShoppingCartItems = ({ shoppingCartItems, setCartTotal }) => {
  const { isActive, message, openSnackBar } = useSnackbar();
  const [
    deleteingCartItem,
    {
      loading: loadingDeleteCartItem,
      error: errorDeleteCartItem,
      data: dataDeleteCartItem,
    },
  ] = useMutation(DELETE_CART_ITEM);

  const [
    updatingCartQuantity,
    {
      loading: loadingUpdateCartQuantity,
      error: errorUpdateCartQuantity,
      data: dataUpdateCartQuantity,
    },
  ] = useMutation(UPDATE_CART_QUANTITY);
  const [cartItems, setCartItems] = useState();
  const { removeFromCart, updateQuantity } = useCart();

  useEffect(() => {
    const newStateValue = shoppingCartItems?.map((item) => ({
      id: item.cartId,
      manufacturerName: item.manufacturerName,
      quantity: item.quantity,
      totalQuantity: item.quantityAvailable,
      price: item.price,
      totalPrice: +(item.price * item.quantity),
    }));
    setCartItems(newStateValue);
  }, [shoppingCartItems]);

  const handleQuantitySelectChange = (e, cartId) => {
    const newQuantity = e.target.value;
    const itemToChangeIndex = [...cartItems].findIndex(
      (item) => item.id === cartId
    );
    updateQuantity(
      cartId,
      shoppingCartItems.find((x) => x.id === cartId).inventoryId,
      newQuantity,
      () =>
        updatingCartQuantity({ variables: { cartId, quantity: newQuantity } })
    );
    const updatedChange = {
      ...cartItems[itemToChangeIndex],
      quantity: newQuantity,
      totalPrice: +(cartItems[itemToChangeIndex].price * newQuantity),
    };
    const newCartItems = [...cartItems];
    newCartItems[itemToChangeIndex] = updatedChange;
    setCartItems(newCartItems);
    setCartTotal(
      newCartItems.reduce((acc, current) => acc + current.totalPrice, 0)
    );
  };

  const handleDeleteCartItemClick = (cartId) => {
    try {
      const totalPrice = cartItems.find((x) => x.id === cartId).totalPrice;
      cartItems.lenth === 1
        ? setCartTotal(0)
        : setCartTotal((prev) => prev - totalPrice);
      removeFromCart(cartId, () =>
        deleteingCartItem({ variables: { cartId } })
      );
      setCartItems((prev) => prev.filter((x) => x.id !== cartId));
      openSnackBar('Item was removed from cart successfully');
    } catch (e) {
      openSnackBar('Something went wrong');
    }
  };

  function getCartItemQuantity(id) {
    if (cartItems) {
      const theCartItemIs = cartItems?.find((x) => x.id === id);
      return theCartItemIs.quantity;
    }
  }

  const getQuantityDropDownOption = (quantity) => {
    let returnValue = [];
    for (let i = 1; quantity >= i; i++) {
      returnValue.push(
        <MenuItem key={`quantityKey${i}`} value={i}>
          {i}
        </MenuItem>
      );
    }
    return returnValue;
  };

  return (
    <>
      {cartItems?.map((item, index) => (
        <React.Fragment key={item.id}>
          <StyledCartRowItemDiv>
            <h3>{item.manufacturerName}</h3>
            <h4>${item.price.toFixed(2)}</h4>
            <FormControl
              sx={{
                width: {
                  xs: 55, // theme.breakpoints.up('xs')
                  sm: 70, // theme.breakpoints.up('sm')
                },
              }}
            >
              <InputLabel style={{ zIndex: '0' }} id="quantity-select-label">
                Qty
              </InputLabel>
              <Select
                style={{ height: '2.5em' }}
                value={cartItems ? getCartItemQuantity(item.id) : item.quantity}
                labelId="quantity-select-label"
                label="Qty"
                onChange={(e, id) => handleQuantitySelectChange(e, item.id)}
              >
                {getQuantityDropDownOption(item.totalQuantity)}
              </Select>
            </FormControl>
            <h4>
              ${cartItems?.find((x) => x.id === item.id).totalPrice.toFixed(2)}
            </h4>
            <DeleteIcon
              color="secondary"
              onClick={() => handleDeleteCartItemClick(cartItems[index].id)}
            />
          </StyledCartRowItemDiv>
          <Snackbar isActive={isActive} message={message} />
        </React.Fragment>
      ))}
    </>
  );
};

export default ShoppingCartItems;
const StyledCartRowItemDiv = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.4fr 0.4fr 0.4fr 0.2fr;
  grid-gap: 1em;
  align-items: center;
  margin-bottom: 1em;
  h3 {
    margin: 0;
    font-weight: 100;
    font-size: var(--font-size-6);
  }

  h4 {
    margin: 0;
    justify-self: end;
    font-weight: 100;
    font-size: 100%;
  }
`;
