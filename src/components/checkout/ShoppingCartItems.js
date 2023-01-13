import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/Delete';
import useCart from '../../hooks/useCart';

const ShoppingCartItems = ({ shoppingCartItems, setCartTotal }) => {
  const [cartItems, setCartItems] = useState();
  const [, setQuantityInCart, setRemoveItemFromCart] = useCart();

  useEffect(() => {
    const newStateValue = shoppingCartItems.map((item) => ({
      id: item.id,
      manufacturerName: item.inventory.manufacturerName,
      quantity: item.quantity,
      totalQuantity: item.inventory.quantity,
      price: item.inventory.price,
      totalPrice: +(item.inventory.price * item.quantity),
    }));
    setCartItems(newStateValue);
  }, []);

  const handleQuantitySelectChange = (e, id) => {
    const newQuantity = e.target.value;
    const itemToChangeIndex = [...cartItems].findIndex(
      (item) => item.id === id
    );
    setQuantityInCart(id, newQuantity);
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
  const handleDeleteCartItemClick = (id) => {
    const totalPrice = cartItems.find((x) => x.id === id).totalPrice;
    cartItems.lenth === 1
      ? setCartTotal(0)
      : setCartTotal((prev) => prev - totalPrice);
    setRemoveItemFromCart(id);
    setCartItems((prev) => prev.filter((x) => x.id !== id));
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
            <h4>${item.price}</h4>
            <FormControl>
              <InputLabel id="quantity-select-label">Quantity</InputLabel>
              <Select
                style={{ height: '2.5em' }}
                value={cartItems ? getCartItemQuantity(item.id) : item.quantity}
                labelId="quantity-select-label"
                label="Quantity"
                onChange={(e, id) => handleQuantitySelectChange(e, item.id)}
              >
                {getQuantityDropDownOption(item.totalQuantity)}
              </Select>
            </FormControl>
            <h4 style={{ marginRight: '1em' }}>
              ${cartItems?.find((x) => x.id === item.id).totalPrice.toFixed(2)}
            </h4>
            <DeleteIcon
              onClick={() => handleDeleteCartItemClick(cartItems[index].id)}
              color="error"
            />
          </StyledCartRowItemDiv>
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
    font-size: 100%;
  }

  h4 {
    margin: 0;
    justify-self: end;
    font-weight: 100;
    font-size: 100%;
  }
  svg {
    cursor: pointer;
  }
`;
