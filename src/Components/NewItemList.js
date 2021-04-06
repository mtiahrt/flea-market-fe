import React from "react";
import { useSubscription, gql } from "@apollo/client";
import Item from "./Item";
import styled from "styled-components";

const mySubscription = gql`
  subscription {
    listen(topic: "saleItemInsertHappen") {
      relatedNode {
        ... on SaleItem {
          id
          name
          manufacturerName
          description
          price
        }
      }
    }
  }
`;

const NewItemList = () => {
  const { data, loading, error } = useSubscription(mySubscription);
  if (error) return <p>An error occured when loading a new arrival</p>;
  if (loading) return <div></div>;
  let {
    listen: { relatedNode },
  } = data;

  return (
    <div>
      <h1>New Arrivals!!</h1>
      <StyledList className="new-item-list">
        <Item
          id={relatedNode.id}
          name={relatedNode.name}
          manufacturerName={relatedNode.manufacturerName}
          description={relatedNode.description}
          price={relatedNode.price}
        ></Item>
      </StyledList>
    </div>
  );
};
const StyledList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(19rem, 1fr));
`;
export default NewItemList;
