import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_CART_ITEMS } from '../../queries/graphQL';
import Typography from '@mui/material/Typography';
import { UserProfileContext } from '../../Contexts/UserContext';
import ShoppingCartItems from './ShoppingCartItems';

export default function ShoppingCart() {
  const { userProfile } = useContext(UserProfileContext);
  const [cartTotal, setCartTotal] = useState(0);
  const {
    loading: loadingCartItems,
    error: errorCartItems,
    data: dataCartItems,
  } = useQuery(GET_CART_ITEMS, {
    variables: {
      user_id: userProfile.id,
    },
    fetchPolicy: 'cache-and-network',
  });
  useEffect(() => sumOfCart(), [dataCartItems]);

  if (loadingCartItems) return 'Loading...';
  if (errorCartItems) return `Error! ${errorCartItems.message}`;

  function sumOfCart() {
    setCartTotal(
      dataCartItems?.cartsList
        .reduce(
          (prev, current) =>
            (prev += +current.inventory.price * current.quantity),
          0
        )
        .toFixed(2)
    );
  }

  console.log('data cart items is', dataCartItems);
  return (
    <StyledContainerDiv>
      <Typography variant="h4" gutterBottom>
        Cart Items
      </Typography>
      <ShoppingCartItems
        shoppingCartItems={dataCartItems.cartsList}
        setCartTotal={setCartTotal}
      ></ShoppingCartItems>
      <Divider style={dividerStyle}></Divider>
      <StyledShipping>
        <Typography variant="h5" gutterBottom>
          Shipping Options
        </Typography>
        <FormControl style={{ flexGrow: '0', flexShrink: '1', width: '90%' }}>
          <InputLabel>Select Shipping Option</InputLabel>
          <Select label="Select Shipping Option">
            <MenuItem value="Ground">Ground $15.32</MenuItem>
            <MenuItem value="Air">Air $32.50</MenuItem>
          </Select>
        </FormControl>
      </StyledShipping>

      <StyledSummation>
        <Typography variant="h5" gutterBottom>
          Cart Total
        </Typography>
        <h2 style={{ margin: '0', marginBottom: '3%' }}>${cartTotal}</h2>
      </StyledSummation>
    </StyledContainerDiv>
  );
}

const StyledShipping = styled.div`
  margin: 1rem 0;
`;

const StyledSummation = styled.div`
  margin: 1rem 0;
`;

const StyledContainerDiv = styled.div`
  display: flex;
  flex: 1 1 20em;
  flex-direction: column;
  padding: 0.5rem;
  border: 2px solid #e3e5e8;
  height: 100%;
`;

const dividerStyle = {
  width: '100%',
};
