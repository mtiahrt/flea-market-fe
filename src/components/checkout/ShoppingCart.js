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
import {
  GET_CART_ITEMS,
  GET_SHIPPING_COSTS_ITEMS,
} from '../../queries/graphQL';
import Typography from '@mui/material/Typography';
import { UserProfileContext } from '../../contexts/UserContext';
import ShoppingCartItems from './ShoppingCartItems';
import { CartContext } from '../../contexts/CartContext';

export default function ShoppingCart() {
  const { userProfile } = useContext(UserProfileContext);
  const { cartItems } = useContext(CartContext);
  const [shippingCost, setShippingCost] = useState({
    id: 0,
    name: '',
    price: 0,
  });
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
  const {
    loading: loadingShippingCostItems,
    error: errorShippingCostItems,
    data: dataShippingCostItems,
  } = useQuery(GET_SHIPPING_COSTS_ITEMS);

  useEffect(() => sumOfCart(), [dataCartItems]);

  if (loadingCartItems || loadingShippingCostItems) return 'Loading...';
  if (errorCartItems || errorShippingCostItems)
    return `Error! ${errorCartItems.message}`;

  function sumOfCart() {
    setCartTotal(
      dataCartItems?.cartsList.reduce(
        (prev, current) =>
          (prev += +current.inventory.price * current.quantity),
        0
      )
    );
  }

  console.log('data cart items is', dataCartItems);

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
    fetch('https://localhost:8080/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': userProfile.accessToken,
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        //todo: send to handled route
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
        <Typography variant="h5" gutterBottom>
          Cart Total
        </Typography>
        <h2 style={{ margin: '0', marginBottom: '3%' }}>
          ${cartTotal === 0 ? 0 : (cartTotal + +shippingCost.price).toFixed(2)}
        </h2>
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