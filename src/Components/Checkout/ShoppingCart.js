import React, {Fragment, useState} from 'react';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import { Divider, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_CART_ITEMS } from '../../queries/graphQL';

export default function ShoppingCart() {
  const {
    loading: loadingCartItems, error: errorCartItems, data: dataCartItems
  } = useQuery(GET_CART_ITEMS);
  const { cartTotal, setCartTotal } = useState(0.00);
  
  if (loadingCartItems) return 'Loading...';
  if (errorCartItems) return (
    <StyledContainerDiv>
      <Typography variant='h4' gutterBottom>Current Cart</Typography>
      <StyledCartItems>
        <StyledCartItem>
          <StyledCartItemBasics>
            <h3>Shimano</h3>
            <h4>$350</h4>
          </StyledCartItemBasics>
          <StyledCartItemDetails>
            SHIMANO ULTEGRA - Rear Derailleur - Medium Cage - SHIMANO SHADOW RD - 11-speed Updated with a SHIMANO SHADOW design, the SHIMANO ULTEGRA 8000 rear derailleur offers a sleek appearance and optimized shifting performance.
          </StyledCartItemDetails>
        </StyledCartItem>
        <StyledCartItem>
          <StyledCartItemBasics>
            <h3>Shimano</h3>
            <h4>$220</h4>
          </StyledCartItemBasics>
          <StyledCartItemDetails>
            DURA-ACE - Dual-Pivot - Brake Caliper - SLR-EV - Rim Brake. With SHIMANO's SLR-EV dual symmetric pivot design, the short-arm DURA-ACE R9100 series caliper brakes employ twin bearings and a roller to realize greater efficiency and deliver superior modulation and stopping power. They are offered in traditional and direct mount options.
          </StyledCartItemDetails>
        </StyledCartItem>
      </StyledCartItems>

      <Divider style={dividerStyle}></Divider>
      
      <StyledShipping>
        <Typography variant='h5' gutterBottom>Shipping Options</Typography>
        <FormControl style={{ flexGrow: '0', flexShrink: '1', width: '90%'}}>
          <InputLabel>Select Shipping Option</InputLabel>
          <Select label='Select Shipping Option'>
            <MenuItem value='Ground'>Ground $15.32</MenuItem>
            <MenuItem value='Air'>Air $32.50</MenuItem>
          </Select>
        </FormControl>
      </StyledShipping>
      
      <Divider style={dividerStyle}></Divider>
      
      <StyledSummation>
        <Typography variant='h5' gutterBottom>Cart Total</Typography>
        <h2 style={{ margin: '0', marginBottom: '3%' }}>${cartTotal}</h2>
      </StyledSummation>
    </StyledContainerDiv>
  )

  return (
    <StyledContainerDiv>
      <Typography variant='h4' gutterBottom>Current Cart</Typography>
      <StyledCartItems>
        
      {dataCartItems.cartsList.map(item => (
        <React.Fragment key={item.id}>
          <StyledCartItem>
          <StyledCartItemBasics>
            <h3>{item.saleItem.manufacturerName}</h3>
            <h4>${item.saleItem.price}</h4>
          </StyledCartItemBasics>
          <StyledCartItemDetails>{item.saleItem.description}</StyledCartItemDetails>
          </StyledCartItem>
        </React.Fragment>
      ))}
      </StyledCartItems>
      <Divider style={dividerStyle}>Shipping
        Options</Divider>

        <StyledShipping>
        <Typography variant='h5' gutterBottom>Shipping Options</Typography>
        <FormControl style={{ flexGrow: '0', flexShrink: '1', width: '90%'}}>
          <InputLabel>Select Shipping Option</InputLabel>
          <Select label='Select Shipping Option'>
            <MenuItem value='Ground'>Ground $15.32</MenuItem>
            <MenuItem value='Air'>Air $32.50</MenuItem>
          </Select>
        </FormControl>
      </StyledShipping>

      <StyledSummation>
        <Typography variant='h5' gutterBottom>Cart Total</Typography>
        <h2 style={{ margin: '0', marginBottom: '3%' }}>${cartTotal}</h2>
      </StyledSummation>
    </StyledContainerDiv>
  );
}

const StyledShipping = styled.div`
  margin: 1rem 0;
  outline: 1px solid blue;
`;

const StyledSummation = styled.div`
  margin: 1rem 0;
`;

const StyledCartItems = styled.div`
outline: 1px solid red;
`;

const StyledCartItem = styled.div`
  padding: 1rem;
`;

const StyledContainerDiv = styled.div`
  display: flex;
  flex: 1 1 20em;
  flex-direction: column;
  padding: 0.5rem;
  border: 2px solid #e3e5e8;
`;

const OldStyledContainerDiv = styled.div`
  border: .1rem solid rgba(0, 0, 0, 0.12);
  box-shadow: -1px 1px rgba(0, 0, 0, 0.12),
  -2px 2px rgba(0, 0, 0, 0.12),
  -3px 3px rgba(0, 0, 0, 0.12),
  -4px 4px rgba(0, 0, 0, 0.12),
  -5px 5px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 3%;
  width: 60%;
  height: 50%;
`;

const dividerStyle = {
  width: '100%'
};
const StyledCartItemDetails = styled.p`
  margin: 0.5rem 0 .5rem 0.5rem;
  font-size: .9em;
  align-self: flex-start;
`;

const StyledCartItemBasics = styled.div`
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