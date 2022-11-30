import React, { useContext } from 'react';
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
import { UserProfileContext } from '../../Contexts/LoginContext';

export default function ShoppingCart() {
  const { userProfile } = useContext(UserProfileContext);

  const {
    loading: loadingCartItems,
    error: errorCartItems,
    data: dataCartItems,
  } = useQuery(GET_CART_ITEMS, {
    variables: {
      user_id: userProfile.uid,
    },
    fetchPolicy: 'cache-and-network',
  });

  function sumOfCart() {
    return dataCartItems.cartsList
      .reduce((prev, current) => (prev += +current.inventory.price), 0)
      .toFixed(2);
  }

  if (loadingCartItems) return 'Loading...';
  if (errorCartItems) return `Error! ${errorCartItems.message}`;
  console.log('data cart items is', dataCartItems);

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

  function handleQuantitySelectChange() {}

  return (
    <StyledContainerDiv>
      <Typography variant="h4" gutterBottom>
        Cart Items
      </Typography>
      <StyledCartItems>
        {dataCartItems.cartsList.map((item) => (
          <React.Fragment key={item.id}>
            <StyledCartItem>
              <StyledCartItemBasics>
                <h3>{item.inventory.manufacturerName}</h3>
                <h4>
                  ${item.inventory.price} X{' '}
                  <FormControl style={quantitySelectStyles}>
                    <InputLabel id="quantity-select-label">Qtl</InputLabel>
                    <Select
                      labelId="quantity-select-label"
                      label="Quantity"
                      onChange={handleQuantitySelectChange}
                    >
                      {getQuantity(item.inventory.quantity)}
                    </Select>
                  </FormControl>
                  ${item.inventory.price * 1}
                </h4>
              </StyledCartItemBasics>
              <StyledCartItemDetails>
                {item.inventory.description}
              </StyledCartItemDetails>
            </StyledCartItem>
          </React.Fragment>
        ))}
      </StyledCartItems>
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
        <h2 style={{ margin: '0', marginBottom: '3%' }}>${sumOfCart()}</h2>
      </StyledSummation>
    </StyledContainerDiv>
  );
}

const quantitySelectStyles = {
  width: '40%',
};
const StyledShipping = styled.div`
  margin: 1rem 0;
`;

const StyledSummation = styled.div`
  margin: 1rem 0;
`;

const StyledCartItems = styled.div``;

const StyledCartItem = styled.div`
  padding: 1rem;
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
const StyledCartItemDetails = styled.p`
  margin: 0.5rem 0 0.5rem 0.5rem;
  font-size: 0.9em;
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
