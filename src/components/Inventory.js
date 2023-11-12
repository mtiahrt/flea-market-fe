import React from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import BasicCard from './BasicCard';
import {
  SEARCH_INVENTORY_BY_CATEGORY,
  SEARCH_INVENTORY_BY_CATEGORY_SUBCATEGORY,
} from '../queries/graphQL';
import { useLocation } from 'react-router';
import Card from './Card';

const Inventory = () => {
  console.log('Inventory is rendering');
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const categoryId = Number(query.get('categoryId'));
  const subcategoryId = Number(query.get('subcategoryId'));

  let queryVariables = { categoryid: categoryId };
  queryVariables = {
    ...queryVariables,
    ...(subcategoryId && { subcategoryid: subcategoryId }),
  };
  const { loading, error, data } = useQuery(
    subcategoryId > 0
      ? SEARCH_INVENTORY_BY_CATEGORY_SUBCATEGORY
      : SEARCH_INVENTORY_BY_CATEGORY,
    {
      variables: queryVariables,
      fetchPolicy: 'cache-and-network',
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  //different collection names can come through
  const collectionName = Object.keys(data)[0];
  return (
    <>
      <StyledDiv>
        <StyledInventory role="item-list">
          <Card isItemInCart={false} inventoryItem={data[collectionName][1]} />
          {data[collectionName]?.map((y) => (
            <BasicCard
              key={`card${y.inventoryid}`}
              isItemInCart={y.cartid ? true : false}
              inventoryItem={y}
            ></BasicCard>
          ))}
        </StyledInventory>
      </StyledDiv>
    </>
  );
};

const StyledDiv = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: row;
`;
const StyledInventory = styled.div`
  display: grid;
  width: 100%;
  gap: 25px;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 0.7fr));
  justify-content: center;
  margin-right: 4rem;
  margin-left: 4rem;
  @media (max-width: 40em) {
    margin: var(--margin-mobile);
  }
`;
export default Inventory;
