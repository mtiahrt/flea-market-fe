import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import styled from 'styled-components';

const ShoppingCartItems = ({ shoppingCartItems, setCartTotal }) => {
  const [cartItems, setCartItems] = useState();
  useEffect(() => {
    const newStateValue = shoppingCartItems.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      price: +item.inventory.price,
      totalPrice: +(item.inventory.price * item.quantity).toFixed(2),
    }));
    setCartItems(newStateValue);
  }, []);

  const handleQuantitySelectChange = (e, id) => {
    const newQuantity = e.target.value;
    const itemToChangeIndex = [...cartItems].findIndex(
      (item) => item.id === id
    );
    const updatedChange = {
      ...cartItems[itemToChangeIndex],
      quantity: newQuantity,
      totalPrice: +(cartItems[itemToChangeIndex].price * newQuantity).toFixed(
        2
      ),
    };
    const newCartItems = [...cartItems];
    newCartItems[itemToChangeIndex] = updatedChange;
    setCartItems(newCartItems);
    setCartTotal(
      newCartItems.reduce((acc, current) => acc + current.totalPrice, 0)
    );
  };

  function getCartItem(id) {
    if (cartItems) {
      const theCartItemIs = cartItems?.find((x) => x.id === id);
      return theCartItemIs.quantity;
    }
  }
  const getQuantity = (quantity) => {
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
    <div>
      {shoppingCartItems?.map((item) => (
        <React.Fragment key={item.id}>
          <StyledCartRowItemDiv>
            <h3>{item.inventory.manufacturerName}</h3>
            <h4>${item.inventory.price}</h4>
            <FormControl>
              <InputLabel id="quantity-select-label">Quantity</InputLabel>
              <Select
                style={{ height: '2.5em' }}
                value={cartItems ? getCartItem(item.id) : item.quantity}
                labelId="quantity-select-label"
                label="Quantity"
                onChange={(e, id) => handleQuantitySelectChange(e, item.id)}
              >
                {getQuantity(item.inventory.quantity)}
              </Select>
            </FormControl>
            <h4 style={{ marginRight: '1em' }}>
              ${cartItems?.find((x) => x.id === item.id).totalPrice.toFixed(2)}
            </h4>
          </StyledCartRowItemDiv>
        </React.Fragment>
      ))}
    </div>
  );
};

export default ShoppingCartItems;
const StyledCartRowItemDiv = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.4fr 0.4fr 0.4fr;
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
`;
