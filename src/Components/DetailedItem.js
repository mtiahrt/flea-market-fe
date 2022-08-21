import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { UserProfileContext } from '../Contexts/LoginContext';
import { Link } from 'react-router-dom';

const itemDetailQuery = gql`
query($saleId: Int!) {
    saleItem(id: $saleId) {
      id
      description
      manufacturerName
      name
      price
      itemImagesList {
        url
      }
      subcategory {
        description
        name
      }
    }
  }
`;

function DetailedItem() {
  const { cartItems, setCartItems } = useContext(UserProfileContext);
  const { id } = useParams();
  const saleId = parseInt(id);
  const { loading, error, data } = useQuery(itemDetailQuery, {
    variables: { saleId }
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  function updateCart(id) {
    console.log('Cart Items before adding:', id, cartItems);
    isItemAlreadyInCart(id)
    ? setCartItems((prev) => prev.filter(item => item !== id))
    : setCartItems((prev) => [...prev, id]);
  }

  function isItemAlreadyInCart(id){
    if(cartItems && cartItems.includes(id)) {
      return true
    }
  }
  console.log('detailItem component is rendering');
  return (
    <div>
      <h2>Item Details</h2>
      <h4>Name: {data.saleItem.name}</h4>
      <h4>Manufacturer Name: {data.saleItem.manufacturerName}</h4>
      <h4>Description: {data.saleItem.description}</h4>
      <h4>Price: {data.saleItem.price}</h4>
      {data.saleItem.itemImagesList.map(img => (
        <img alt='sale item' src={img.url} />
      ))}
      <Link to={`/`}><button>Return to Home</button></Link>
      <button onClick={ () => updateCart(data.saleItem.id) }>
        {isItemAlreadyInCart(data.saleItem.id)
        ? 'Remove from cart'
        : 'Add to Cart'}
      </button>
      <Link to={`/BuyNow`}><button>Buy Now</button></Link>
    </div>
  );
}

export default DetailedItem;
