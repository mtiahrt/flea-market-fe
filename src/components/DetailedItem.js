import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { useHistory, useLocation } from 'react-router-dom';
import ImagesTile from './shared/ImagesTile';
import useCart from '../hooks/useCart';
import { GET_INVENTORY_ITEM } from '../queries/graphQL';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';

function DetailedItem() {
  const history = useHistory();
  const location = useLocation();
  const [quantity, setQuantity] = useState(0);
  const [isInCart, setIsInCart] = useState(location.state.isInCart);
  const inventoryId = location.state.inventoryId;
  const [setAddItemToCart, setQuantityInCart, setRemoveItemFromCart] =
    useCart();
  const { loading, error, data, refetch } = useQuery(GET_INVENTORY_ITEM, {
    variables: { inventoryId },
    fetchPolicy: 'cache-and-network',
  });
  useEffect(() => {
    let quantity = 1;
    if (data && isInCart) {
      quantity = data.inventory.cartsList[0].quantity;
    }
    setQuantity(quantity);
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  const cartId = isInCart ? data.inventory.cartsList[0]?.id : -1;
  const handleQuantitySelectChange = (e) => {
    const quantity = +e.target.value;
    if (isInCart) {
      setQuantityInCart(cartId, quantity);
    }
    setQuantity(quantity);
  };
  const getQuantityDropDownOptions = (quantity) => {
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

  function navigateToEditItem(id) {
    history.push({
      pathname: `/EditItem/${id}`,
      state: {
        fileDataURL: data.inventory.itemImagesList,
        isInCart,
      },
    });
  }

  const handleAddOrRemoveFromCartClick = () => {
    const refetchData = !isInCart;
    setIsInCart(!isInCart);
    isInCart
      ? setRemoveItemFromCart(cartId)
      : setAddItemToCart(inventoryId, quantity);

    //refetch if item was added to cart
    if (refetchData) {
      refetch({ inventoryId });
    }
  };
  console.log('detailItem component is rendering');
  console.log('data is', data);

  return (
    <StyledDiv className="container">
      <StyledH2>Item Details</StyledH2>
      <StyledH4>Name: {data.inventory.name}</StyledH4>
      <StyledH4>Manufacturer Name: {data.inventory.manufacturerName}</StyledH4>
      <StyledH4>Description: {data.inventory.description}</StyledH4>
      <StyledH4>Price: {data.inventory.price}</StyledH4>
      <FormControl style={quantitySelectStyles}>
        <InputLabel id="quantity-select-label">Quantity</InputLabel>
        <Select
          labelId="quantity-select-label"
          value={quantity}
          label="Quantity"
          disabled={data.inventory.quantity < 2}
          onChange={handleQuantitySelectChange}
        >
          {getQuantityDropDownOptions(data.inventory.quantity)}
        </Select>
      </FormControl>
      <ImagesTile fileDataURL={data.inventory.itemImagesList} />
      <StyledButtonsDiv className="buttons">
        <Button onClick={handleAddOrRemoveFromCartClick} variant="contained">
          {isInCart ? 'Remove from cart' : 'Add to Cart'}
        </Button>
        <Button
          onClick={() => navigateToEditItem(inventoryId, inventoryId)}
          variant="contained"
        >
          Edit Item
        </Button>
      </StyledButtonsDiv>
    </StyledDiv>
  );
}

export default DetailedItem;
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 20%;
  gap: 0.2rem;
  @media screen and (max-width: 700px) {
    .container {
      align-items: center;
    }

    h2,
    h4 {
      align-self: flex-start;
    }

    .buttons {
      flex-direction: column;
      gap: 0.4rem;
    }

    button {
      width: 100%;
    }
  }
`;
const StyledH2 = styled.h2`
  margin: 0.5rem;
`;
const StyledH4 = styled.h4`
  margin: 0.5rem;
`;
const quantitySelectStyles = {
  width: '25%',
  margin: '.4em 0 .4em 0',
};
const StyledButtonsDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  margin-top: 0.6rem;

  button {
    width: 48%;
  }

  @media (max-width: 700px) {
    flex-direction: column;
    gap: 0.4rem;
    button {
      width: 100%;
    }
  }
`;
