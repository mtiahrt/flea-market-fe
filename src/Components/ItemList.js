import React from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import BasicCard from './BasicCard';
import { CARD_ITEM } from '../queries/graphQL';

const ItemList = () => {
  const { loading, error, data } = useQuery(CARD_ITEM);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <StyledList className='item-list'>
      {data.saleItemsList.map((item) => (
          <BasicCard link={`DetailedItem/${item.id}`} cardData={item}></BasicCard>
      ))}
    </StyledList>
  );
};
const StyledList = styled.div`
  display: grid;
  margin: 25px;
  gap: 25px;
  grid-template-columns: repeat(auto-fit, minmax(19rem, 1fr));
`;
export default ItemList;
