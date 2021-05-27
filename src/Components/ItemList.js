import React from "react";
import Item from "./Item";
import { useQuery, gql } from "@apollo/client";
import styled from "styled-components";
// import NewItemList from "../Components/NewItemList"


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
      {/* TODO: add this back later... <NewItemList></NewItemList> */}
      {data.saleItemsList.map((item) => (
        <Item
        key={item.id}
          id={item.id}
          name={item.name}
          manufacturerName={item.manufacturerName}
          description={item.description}
          price={item.price}
        ></Item>
      ))}
    </StyledList>
  );
};
const StyledList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(19rem, 1fr));
`;
export default ItemList;
