import React from 'react';
import styled from 'styled-components';
import { Divider, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_CART_ITEMS } from '../../queries/graphQL';

export default function ShoppingCart() {
  const {
    loading: loadingCartItems, error: errorCartItems, data: dataCartItems
  } = useQuery(GET_CART_ITEMS);

  function sumOfCart(){
    return dataCartItems.cartsList.reduce((prev, current) => prev += +current.saleItem.price, 0)
  }

  if (loadingCartItems) return 'Loading...';
  if (errorCartItems) return `Error! ${errorCartItems.message}`;
  return (
    <StyledContainerDiv>
      <h1>Current Cart</h1>
      {dataCartItems.cartsList.map(item => (
        <React.Fragment key={item.id}>
          <StyledCartItemDiv>
            <h3>{item.saleItem.manufacturerName}</h3>
            <h4>${item.saleItem.price}</h4>
          </StyledCartItemDiv>
          <StyledParagraph>{item.saleItem.description}</StyledParagraph>
        </React.Fragment>
      ))}
      <Divider style={dividerStyle}>Shipping
        Options</Divider>
      <FormControl style={{ flexGrow: '0', flexShrink: '1', width: '90%' }}>
        <InputLabel>Select Shipping Option</InputLabel>
        <Select label='Select Shipping Option'>
          <MenuItem value='Ground'>Ground $15.32</MenuItem>
          <MenuItem value='Air'>Air $32.50</MenuItem>
        </Select>
      </FormControl>
      <Divider style={dividerStyle}>Cart
        Total</Divider>
      <h2 style={{ margin: '0', marginBottom: '3%' }}>${sumOfCart()}</h2>
    </StyledContainerDiv>
  );
}
const StyledContainerDiv = styled.div`
  border: .1rem solid rgba(0, 0, 0, .06);
  box-shadow: -1px 1px rgba(0, 0, 0, .06),
  -2px 2px rgba(0, 0, 0, .06),
  -3px 3px rgba(0, 0, 0, .06),
  -4px 4px rgba(0, 0, 0, .06),
  -5px 5px rgba(0, 0, 0, .06);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 3%;
  width: 60%;
  height: 50%;
`;

const dividerStyle = {
  fontSize: '1.3em',
  margin: '3% 0 2% 0',
  flexGrow: '0',
  flexShrink: '1',
  width: '100%'
};
const StyledParagraph = styled.p`
  margin: 0 0 .5em 6%;
  font-size: .06em;
  align-self: flex-start;
`;

const StyledCartItemDiv = styled.div`
  h3 {
    margin: 0;
  }

  h4 {
    margin: 0;
  }

  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 90%;
`;