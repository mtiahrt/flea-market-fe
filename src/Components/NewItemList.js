import React, { useState } from "react";
import { useSubscription, gql } from "@apollo/client";
import Item from "./Item";
import styled from "styled-components";

const mySubscription = gql`
  subscription {
    listen(topic: "inventoryInsertHappen") {
      relatedNode {
        ... on inventory {
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
  const [relatedNodes, setRelatedNodes] = useState([]);
  //use hook to update newItem state
  const { loading, error, data } = useSubscription(mySubscription,
    {
      onSubscriptionData: ({ subscriptionData: { data } }) => {
        //deconstruct node from sub
        const {listen: { relatedNode }} = data;
        //add to state
        setRelatedNodes(() => [relatedNode, ...relatedNodes]);
      }
    },  
  )
  if (error) return <p>An error occured when loading a new arrival</p>;
  if (loading) return <div>Listening for new items</div>;

  return (
    <div>
      <h1>New Arrivals!!</h1>
      <StyledList className="new-item-list">
        {relatedNodes.map((relatedNode) => {
        return <Item
          id={relatedNode.id}
          name={relatedNode.name}
          manufacturerName={relatedNode.manufacturerName}
          description={relatedNode.description}
          price={relatedNode.price}
          />
        })}
      </StyledList>
    </div>
  );
};
const StyledList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(19rem, 1fr));
`;
export default NewItemList;