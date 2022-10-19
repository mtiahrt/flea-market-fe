import React from 'react';
import styled from 'styled-components';
import { Divider, InputLabel, MenuItem, Select } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_CART_ITEMS } from '../../queries/graphQL';

export default function ShoppingCart() {
  const {
    loading: loadingCartItems, error: errorCartItems, data: dataCartItems
  } = useQuery(GET_CART_ITEMS);

  if (loadingCartItems) return 'Loading...';
  if (errorCartItems) return `Error! ${errorCartItems.message}`;
  return (
    <StyledDiv>
      <h1 style={{width: '100%'}}>Current Cart</h1>
      {dataCartItems.cartsList.map(item => (
        <div>
          <h3>{item.saleItem.manufacturerName}</h3>
          <p>{item.saleItem.description}</p>
          <h4>{item.saleItem.price}</h4>
        </div>
      ))}
      <h1>Shipping Options</h1>
      <InputLabel>Select Shipping Option</InputLabel>
      <Select>
        <MenuItem value='Ground'>Ground</MenuItem>
        <MenuItem value='Air'>Air</MenuItem>
      </Select>
      <h1>Cart Total</h1>
      <h2>$20.84</h2>
    </StyledDiv>
  );
}


const StyledDiv = styled.div`
  border: black solid;
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  //margin: 0 20%;
`;