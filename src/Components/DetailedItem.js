import React from 'react';

import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useQuery, gql } from "@apollo/client";

const itemDetailQuery = gql`
query($saleId: Int!) {
    saleItem(id: $saleId) {
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
`

function DetailedItem({ navigation }) {
    const { id } = useParams();
    const saleId = parseInt(id);
    const { loading, error, data } = useQuery(itemDetailQuery, {
        variables: { saleId }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    return (
        <div>
            <h2>Item Details</h2>
            <h4>Name: {data.saleItem.name}</h4>
            <h4>Manufacturer Name: {data.saleItem.manufacturerName}</h4>
            <h4>Description: {data.saleItem.description}</h4>
            <h4>Price: {data.saleItem.price}</h4>
            {data.saleItem.itemImagesList.map(img => (
                <img alt="sale item" src={img.url} />
            ))}
            <Link to={`/`}><button>Return to Home</button></Link>
            <Link to={`/AddToCart`}><button>Add to Cart</button></Link>
            <Link to={`/BuyNow`}><button>Buy Now</button></Link>

        </div>
    )
}

export default DetailedItem;