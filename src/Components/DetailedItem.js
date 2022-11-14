import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { UserProfileContext } from '../Contexts/LoginContext';
import { useHistory } from 'react-router-dom';
import ImagesTile from '../SharedComponents/ImagesTile';
import { GET_SALE_ITEM } from '../queries/graphQL';
import { Button } from '@mui/material';

function DetailedItem() {
  const history = useHistory();
  const { cartItems, setCartItems } = useContext(UserProfileContext);
  const { id } = useParams();
  const saleId = parseInt(id);
  const { loading, error, data } = useQuery(GET_SALE_ITEM, {
    variables: { saleId }
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  function updateCart(id) {
    isItemAlreadyInCart(id)
      ? setCartItems((prev) => prev.filter(item => item !== id))
      : setCartItems((prev) => [...prev, id]);
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
        fileDataURL: data.saleItem.itemImagesList
      }
    });
  }

  return (
    <StyledDiv className='container'>
      <StyledH2>Item Details</StyledH2>
      <StyledH4>Name: {data.saleItem.name}</StyledH4>
      <StyledH4>Manufacturer Name: {data.saleItem.manufacturerName}</StyledH4>
      <StyledH4>Description: {data.saleItem.description}</StyledH4>
      <StyledH4>Price: {data.saleItem.price}</StyledH4>
      <ImagesTile fileDataURL={data.saleItem.itemImagesList} />
      <StyledButtonsDiv className="buttons">
        <Button onClick={() => updateCart(data.saleItem.id)} variant='contained'>
          {isItemAlreadyInCart(data.saleItem.id)
            ? 'Remove from cart'
            : 'Add to Cart'}
        </Button>
        <Button onClick={() => navigateToEditItem(data.saleItem.id)}
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

    .buttons{
      flex-direction: column;
      gap: .4rem;
    }

    button {
      width: 100%
    }
  }
`
const StyledH2 = styled.h2`
  margin: .5rem;
`
const StyledH4 = styled.h4`
  margin: .5rem;
`

const StyledButtonsDiv= styled.div `
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  margin-top: .6rem;
  button{
    width: 48%;
  }
  @media (max-width: 700px) {
    flex-direction: column;
    gap: .4rem;
    button{
      width: 100%;
    }
  }
`