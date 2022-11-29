import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useMutation, useQuery } from '@apollo/client';
import { UserProfileContext } from '../Contexts/LoginContext';
import { useHistory } from 'react-router-dom';
import ImagesTile from '../SharedComponents/ImagesTile';
import { ADD_CART_ITEM, DELETE_CART_ITEM, GET_SALE_ITEM } from '../queries/graphQL';
import { Button } from '@mui/material';

function DetailedItem() {
  const history = useHistory();
  const { cartItems, setCartItems, userProfile } = useContext(UserProfileContext);
  const { id } = useParams();
  const saleId = parseInt(id);
  const [deleteCartItem, {
    loading: loadingDeleteCartItem, error: errorDeleteCartItem, data: dataDeleteCartItem
  }] = useMutation(DELETE_CART_ITEM);
  const [addCartItem, {
    loading: loadingAddCartItem, error: errorAddCartItem, data: dataAddCartItem
  }] = useMutation(ADD_CART_ITEM);
  const { loading, error, data, refetch } = useQuery(GET_SALE_ITEM, {
    variables: { saleId },
    fetchPolicy: 'cache-and-network'
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  console.log('data in detailed item is:', data);

  function updateCart(cartItemId, inventoryId) {
    isItemAlreadyInCart(+inventoryId)
      ? removeItemFromCart(cartItemId, +inventoryId)
      : addItemToCart(+inventoryId);
  }

  function addItemToCart(inventoryId) {
    addCartItem({
      variables: {
        inventoryId: inventoryId,
        userId: userProfile.uid
      }
    }).then(() => {
        setCartItems((prev) => [...prev, inventoryId]);
      }
    );
  }

  function removeItemFromCart(cartItemId, inventoryId) {
    deleteCartItem({
      variables: {
        id: cartItemId
      }
    });
    setCartItems((prev) => prev.filter(item => item !== inventoryId));
  }

  function isItemAlreadyInCart(id) {
    if (cartItems && cartItems.includes(id)) {
      return true;
    }
  }

  console.log('detailItem component is rendering');

  function navigateToEditItem(id) {
    history.push({
      pathname: `/EditItem/${id}`,
      state: {
        fileDataURL: data.inventory.itemImagesList
      }
    });
  }

  console.log('data in detail item is', data);
  return (
    <StyledDiv className='container'>
      <StyledH2>Item Details</StyledH2>
      <StyledH4>Name: {data.inventory.name}</StyledH4>
      <StyledH4>Manufacturer Name: {data.inventory.manufacturerName}</StyledH4>
      <StyledH4>Description: {data.inventory.description}</StyledH4>
      <StyledH4>Price: {data.inventory.price}</StyledH4>
      <StyledH4>Quantity Available: {data.inventory.quantity}</StyledH4>
      <ImagesTile fileDataURL={data.inventory.itemImagesList} />
      <StyledButtonsDiv className="buttons">
        <Button onClick={() => updateCart(data.inventory.cartsList[0]?.id, id)} variant='contained'>
          {isItemAlreadyInCart(data.inventory.id)
            ? 'Remove from cart'
            : 'Add to Cart'}
        </Button>
        <Button onClick={() => navigateToEditItem(id, data.inventory.id)}
                variant='contained'>Edit
          Item</Button>
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
  gap: .2rem;
  @media screen and (max-width: 700px) {
    .container {
      align-items: center;
    }

    h2, h4 {
      align-self: flex-start;
    }

    .buttons {
      flex-direction: column;
      gap: .4rem;
    }

    button {
      width: 100%
    }
  }
`;
const StyledH2 = styled.h2`
  margin: .5rem;
`;
const StyledH4 = styled.h4`
  margin: .5rem;
`;

const StyledButtonsDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  margin-top: .6rem;

  button {
    width: 48%;
  }

  @media (max-width: 700px) {
    flex-direction: column;
    gap: .4rem;
    button {
      width: 100%;
    }
  }
`;