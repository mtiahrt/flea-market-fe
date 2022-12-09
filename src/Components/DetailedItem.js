import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { useHistory, useLocation } from 'react-router-dom';
import ImagesTile from '../SharedComponents/ImagesTile';
import useCart from '../CustomHooks/useCart';
import {
  GET_INVENTORY_ITEM,
} from '../queries/graphQL';
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
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setisInCart] = useState(location.state.isInCart)
  const { id } = useParams();
  const inventoryId = parseInt(id);
  const [setCartItem] = useCart(inventoryId);

  const { loading, error, data, refetch } = useQuery(GET_INVENTORY_ITEM, {
    variables: { saleId: inventoryId },
    fetchPolicy: 'cache-and-network',
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  console.log('data in detailed item is:', data);
  const cartId = data.inventory.cartsList.length ? data.inventory.cartsList[0]?.id : -1
  const handleQuantitySelectChange = (e) => {
    setQuantity(+e.target.value);
  };
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

  console.log('detailItem component is rendering');

  function navigateToEditItem(id) {
    history.push({
      pathname: `/EditItem/${id}`,
      state: {
        fileDataURL: data.inventory.itemImagesList,
      },
    });
  }
  const addToCartClickHandler = () => {
    const refetchData = !isInCart
    setisInCart(!isInCart);
    setCartItem(cartId);
    //refetch if item was added to cart
    if(refetchData){
      refetch({saleId: inventoryId})
    }
  }
  console.log('data in detail item is', data);
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
          {getQuantity(data.inventory.quantity)}
        </Select>
      </FormControl>
      <ImagesTile fileDataURL={data.inventory.itemImagesList} />
      <StyledButtonsDiv className="buttons">
        <Button
          onClick={()=> addToCartClickHandler(cartId)}
          variant="contained"
        >
          {isInCart
            ? 'Remove from cart'
            : 'Add to Cart'}
        </Button>
        <Button
          onClick={() => navigateToEditItem(id, data.inventory.id)}
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
