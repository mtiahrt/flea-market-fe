import React, { useEffect, useReducer, useState, useContext } from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import BasicCard from './BasicCard';
import { INVENTORY_BY_CATEGORY_WITH_CART } from '../queries/graphQL';
import { useCart } from '../contexts/CartContext';
import filterReducer from './InventoryFilterReducer';
import { UserContext } from '../contexts/UserContext';
import { useParams } from 'react-router-dom';

const Inventory = () => {
  let { categoryId } = useParams();
  let { subcategoryId } = useParams();
  categoryId = Number(categoryId);
  subcategoryId = Number(subcategoryId);
  const { user } = useContext(UserContext);
  const [state, dispatch] = useReducer(filterReducer, []);
  const { loadCartItems } = useCart();

  const { loading, error, data, refetch } = useQuery(
    INVENTORY_BY_CATEGORY_WITH_CART,
    {
      variables: {
        applicationUserId: user?.id,
        categoryId: null,
      },
      fetchPolicy: 'cache-and-network',
    }
  );

  useEffect(() => {
    if (categoryId) {
      refetch({ categoryId: categoryId }).then((x) =>
        console.log('refresh result is', x)
      );
    }
  }, [categoryId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  console.log('Inventory is rendering');
  return (
    <>
      <StyledDiv>
        <StyledInventory role="item-list">
          {data.inventoryByCategoryWithCartsList.map((y) => (
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
