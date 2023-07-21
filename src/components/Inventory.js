import React, { useEffect, useReducer, useState, useContext } from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import BasicCard from './BasicCard';
import {
  INVENTORY_BY_CATEGORY_WITH_CART,
  INVENTORY_LIST_AND_CART_ITEMS,
} from '../queries/graphQL';
import { useCart } from '../contexts/CartContext';
import CartContextModel from '../models/CartContextModel';
import filterReducer from './InventoryFilterReducer';
import { UserContext } from '../contexts/UserContext';
import { useParams } from 'react-router-dom';

const Inventory = () => {
  let { categoryId } = Number(useParams());
  const [showFilter, setShowFilter] = useState(false);
  const { user } = useContext(UserContext);
  const [state, dispatch] = useReducer(filterReducer, []);
  const { loadCartItems } = useCart();

  const { loading, error, data, refetch } = useQuery(
    INVENTORY_BY_CATEGORY_WITH_CART,
    {
      variables: {
        applicationUserId: user?.id,
        categoryId: 1,
      },
      fetchPolicy: 'cache-and-network',
    }
  );

  useEffect(() => {
    if (categoryId) {
      refetch({ applicationUserId: user?.id, categoryId: categoryId }).then(
        (x) => console.log('refresh result is', x)
      );
    }
  }, [categoryId]);

  // useEffect(() => {
  //   console.log('Inventory use effect fired...');
  //   if (data?.inventoriesList.cartItems) {
  //     loadCartItems(
  //       data?.inventoriesList
  //         ?.filter((item) => item.cartsList.length)
  //         .map(
  //           (item) =>
  //             new CartContextModel(
  //               item.cartsList[0].id,
  //               item.cartsList[0].quantity,
  //               item.price
  //             )
  //         )
  //     );
  //   }
  // }, [data]);

  const filterFunction = (inventoryItem) => {
    return state.length === 0
      ? true
      : state.some(
          (x) =>
            x.categoryId === inventoryItem.subcategory.category.id &&
            x.subcategoryIds.includes(inventoryItem.subcategoryId)
        );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  console.log('Inventory is rendering');
  return (
    <>
      <StyledDiv>
        <StyledInventory role="item-list">
          {data.subcategoriesList
            .filter((x) => x.inventoriesList.length > 0)
            .map((x) => x.inventoriesList.map((y) => console.log(y)))
            .map((y) => (
              <BasicCard
                key={`card${x.inventoriesList.id.toString()}`}
                isItemInCart={x.cartsList?.length && user ? true : false}
                link={`DetailedItem/${x.inventoriesList.id}`}
                inventoryItem={x.inventoriesList}
                isMobleView={showFilter}
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
  margin-right: 1rem;
`;
export default Inventory;
