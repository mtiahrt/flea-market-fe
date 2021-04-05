import React from "react";
import Item from "./Item";
import { useQuery, gql } from "@apollo/client";
import styled from "styled-components";

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

//subscirption query
// subscription{
//   listen(topic: "saleItemInsertHappen"){
//     relatedNode{
//       ... on SaleItem{
//         id
//         name
//         manufacturerName
//         description
//         price
//       }
//     }
//   }
// }

const ItemList = () => {
  const { loading, error, data } = useQuery(myQuery);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <StyledList className="item-list">
      {data.saleItemsList.map((item) => (
        <Item
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
