import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_SHIPPING_COSTS_ITEMS } from '../../queries/graphQL';
import { UserContext } from '../../contexts/UserContext';
import ShoppingCartItems from './ShoppingCartItems';
import { useCart } from '../../contexts/CartContext';
import Typography from '@mui/material/Typography';

export default function ShoppingCart() {
  const { user } = useContext(UserContext);
  const { cartItems } = useCart();
  const [shippingCost, setShippingCost] = useState({
    id: 0,
    name: '',
    price: 0,
  });
  const [cartTotal, setCartTotal] = useState(0);
  const {
    loading: loadingShippingCostItems,
    error: errorShippingCostItems,
    data: dataShippingCostItems,
  } = useQuery(GET_SHIPPING_COSTS_ITEMS);

  useEffect(() => sumOfCart(), [cartItems]);

  if (loadingShippingCostItems) return 'Loading...';
  if (errorShippingCostItems) return `Error! ${errorShippingCostItems.message}`;

  function sumOfCart() {
    setCartTotal(
      cartItems?.reduce(
        (prev, current) => (prev += +current.price * current.quantity),
        0
      )
    );
  }

  const shippingPriceByID = (shippingId) =>
    dataShippingCostItems.shippingCostsList.find((x) => x.id === shippingId);

  function handleShippingSelectChange(e) {
    const shippingId = +e.target.value;
    const shippingPrice = shippingPriceByID(shippingId);
    cartTotal === 0 ? setShippingCost('') : setShippingCost(shippingPrice);
  }

  function handleBuyNowClick() {
    const requestBody = cartItems.map((i) => {
      return { cartId: i.cartId, inventoryItem: true };
    });
    requestBody.push({ shippingId: shippingCost.id, inventoryItem: false });
    fetch(
      `${process.env.REACT_APP_BACKEND_SERVER_URI}/create-checkout-session`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Token': user.accessToken,
        },
        body: JSON.stringify(requestBody),
      }
    )
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        //todo: send to handled successful purchase route
        window.location = url;
      })
      .catch((e) => {
        console.error(e.error);
      });
  }
  return (
    <StyledContainerDiv>
      <Typography variant="h4" gutterBottom>
        Cart Items
      </Typography>
      <ShoppingCartItems
        shoppingCartItems={cartItems}
        setCartTotal={setCartTotal}
      ></ShoppingCartItems>
      <Divider style={dividerStyle}></Divider>
      <StyledShipping>
        <Typography variant="h4" gutterBottom>
          Shipping Options
        </Typography>
        <FormControl
          style={{
            marginTop: '4%',
            flexGrow: '0',
            flexShrink: '1',
            width: '90%',
          }}
        >
          <InputLabel sx={{ zIndex: '0' }}>Select Shipping Option</InputLabel>
          <Select
            onChange={(e) => handleShippingSelectChange(e)}
            label="Select Shipping Option"
            value={shippingCost.id}
          >
            {dataShippingCostItems.shippingCostsList.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {`${item.name} $${item.price}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </StyledShipping>
      <StyledSummation>
        <Typography variant="h4" gutterBottom>
          Cart Total
        </Typography>
        <h3 style={{ margin: '0', marginBottom: '3%' }}>
          ${cartTotal === 0 ? 0 : (cartTotal + +shippingCost.price).toFixed(2)}
        </h3>
      </StyledSummation>
      <Button onClick={handleBuyNowClick} variant="contained">
        Buy Now
      </Button>
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
  background-color: var(--logo-fill-color);
  border-radius: var(--border-radius);
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
