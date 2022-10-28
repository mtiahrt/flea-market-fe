import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { UserProfileContext } from '../Contexts/LoginContext';
import { useHistory } from 'react-router-dom';
import ImagesTile from '../SharedComponents/ImagesTile';
import { GET_SALE_ITEM } from '../queries/graphQL';
import styled from 'styled-components';
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
    debugger;
    history.push({
      pathname: `/EditItem/${id}`,
        state: {
          fileDataURL: data.saleItem.itemImagesList
        }
    })
  }

  function navigateToBuyNow() {

  }

  return (
    <StyledDiv>
      <h2>Item Details</h2>
      <h4>Name: {data.saleItem.name}</h4>
      <h4>Manufacturer Name: {data.saleItem.manufacturerName}</h4>
      <h4>Description: {data.saleItem.description}</h4>
      <h4>Price: {data.saleItem.price}</h4>
      <ImagesTile fileDataURL={data.saleItem.itemImagesList} />
      <Button style={buttonStyles} onClick={() => updateCart(data.saleItem.id)} variant='contained'>
        {isItemAlreadyInCart(data.saleItem.id)
          ? 'Remove from cart'
          : 'Add to Cart'}
      </Button>
      <Button onClick={() => navigateToEditItem(data.saleItem.id)} variant='contained' style={buttonStyles}>Edit
        Item</Button>
      <Button onClick={navigateToBuyNow} variant='contained' style={buttonStyles}>Buy Now</Button>
    </StyledDiv>
  );
}

export default DetailedItem;

const buttonStyles = {
  width: '50%',
  margin: '.5% 0 .5% 0'
};


const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  height: 0;
`;