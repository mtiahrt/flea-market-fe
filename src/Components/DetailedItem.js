import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { UserProfileContext } from '../Contexts/LoginContext';
import { Link } from 'react-router-dom';
import ImagesTile from '../SharedComponents/ImagesTile';
import { GET_SALE_ITEM } from '../queries/graphQL';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';

function DetailedItem() {
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
  return (
    <StyledDiv>
      <h2>Item Details</h2>
      <h4>Name: {data.saleItem.name}</h4>
      <h4>Manufacturer Name: {data.saleItem.manufacturerName}</h4>
      <h4>Description: {data.saleItem.description}</h4>
      <h4>Price: {data.saleItem.price}</h4>
      <Grid item style={{ marginTop: '5%' }} xs={12}>
        <ImagesTile fileDataURL={data.saleItem.itemImagesList} />
      </Grid>
      <Link to={`/`}>
        <button>Return to Home</button>
      </Link>
      <button onClick={() => updateCart(data.saleItem.id)}>
        {isItemAlreadyInCart(data.saleItem.id)
          ? 'Remove from cart'
          : 'Add to Cart'}
      </button>
      <Link to={{
        pathname:`/EditItem/${data.saleItem.id}`,
        state: {
          fileDataURL: data.saleItem.itemImagesList,
        },
      }}
      >
        <button>Edit Item</button>
      </Link>
      <Link to={`/BuyNow`}>
        <button>Buy Now</button>
      </Link>
    </StyledDiv>
  );
}

export default DetailedItem;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  height: 0;
`;