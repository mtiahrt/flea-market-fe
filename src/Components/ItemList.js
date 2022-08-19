import React from "react";
import Item from "./Item";
import { useQuery, gql } from "@apollo/client";
import styled from "styled-components";
import { Link } from 'react-router-dom';


const myQuery = gql`
  query {
    saleItemsList {
      id
      description
      manufacturerName
      name
      price
    }
  }
`;

const ItemList = () => {
  const { loading, error, data } = useQuery(myQuery);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;  

  return (

    <StyledList className="item-list">
      {data.saleItemsList.map((item) => (
        <Link key={item.id.toString()} to={`DetailedItem/${item.id}`}>
          <Item
            name={item.name}
            manufacturerName={item.manufacturerName}
            description={item.description}
            price={item.price}
          ></Item>
        </Link>
      ))}
    </StyledList>
  );
};
const StyledList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(19rem, 1fr));
`;
export default ItemList;
