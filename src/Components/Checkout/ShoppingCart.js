import * as React from 'react';
import styled from 'styled-components';
import { Divider } from '@mui/material';



export default function ShoppingCart() {
  return(
    <StyledDiv>
      <h1 style={{flex: '0 0 100%'}}>Current Cart</h1>
      <h3 style={{flex: 1}}>Brand</h3>
      <h3 style={{flex: 1}}>Name</h3>
      <h3>Price</h3>
      <h3>Shipping Options</h3>
      <Divider/>
      <h3>Total</h3>
    </StyledDiv>
  )
}


const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 0 20%;
`;