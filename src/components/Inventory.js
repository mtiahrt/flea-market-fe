import React, { useContext, useEffect, useReducer } from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import BasicCard from './BasicCard';
import { INVENTORY_LIST } from '../queries/graphQL';
import { UserProfileContext } from '../contexts/UserContext';
import { useCart } from '../contexts/CartContext';
import CartContextModel from '../models/CartContextModel';
import InventoryFilter from './InventoryFilter';
import filterReducer from './InventoryFilterReducer';

const Inventory = () => {
  const [state, dispatch] = useReducer(filterReducer, []);
  const { userProfile } = useContext(UserProfileContext);
  const { loadCartItems } = useCart();
  const { loading, error, data } = useQuery(INVENTORY_LIST, {
    variables: {
      applicationUserId: userProfile.id,
    },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    console.log('Item List use effect fired...');
    if (data?.inventoriesList && userProfile.isLoggedIn) {
      loadCartItems(
        data?.inventoriesList
          ?.filter((item) => item.cartsList.length)
          .map(
            (item) =>
              new CartContextModel(
                item.cartsList[0].id,
                item.cartsList[0].quantity,
                item.price
              )
          )
      );
    }
  }, [userProfile.isLoggedIn, data]);

  const filterFunction = (inventoryItem) => {
    console.log(inventoryItem);
    return state.length === 0
      ? true
      : state.some(
          (x) =>
            x.categoryId === inventoryItem.subcategory.category.id &&
            x.subcategoryIds.includes(inventoryItem.subcategoryId)
        );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log('Item List data is :', data);
  return (
    <StyledDiv>
      <InventoryFilter
        categories={
          data
            ? data.inventoriesList
                //create objects category with its subcategories
                .map((item) => ({
                  id: item.subcategory.category.id,
                  name: item.subcategory.category.name,
                  subcategories: data.inventoriesList
                    .filter(
                      //match to only the category in question
                      (x) =>
                        x.subcategory.category.id ===
                        item.subcategory.category.id
                    ) //create unique list of subcategories
                    .filter((obj, index, self) => {
                      return (
                        index ===
                        self.findIndex(
                          (t) => t.subcategoryId === obj.subcategoryId
                        )
                      );
                    }) //build a subcategories array
                    .map((x) => ({
                      id: x.subcategory.id,
                      name: x.subcategory.name,
                    })),
                })) //create a unique list of categories
                .filter((obj, index, self) => {
                  return index === self.findIndex((t) => t.id === obj.id);
                })
            : []
        }
        dispatchFilter={dispatch}
      />
      <StyledInventory role="item-list">
        {data.inventoriesList.filter(filterFunction).map((item) => (
          <BasicCard
            key={`card${item.id.toString()}`}
            isItemInCart={item.cartsList.length ? true : false}
            link={`DetailedItem/${item.id}`}
            inventoryItem={item}
          ></BasicCard>
        ))}
      </StyledInventory>
    </StyledDiv>
  );
};
const StyledDiv = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: row;
  border: 5px solid red;
`;
const StyledInventory = styled.div`
  display: grid;
  width: 100%;
  gap: 25px;
  grid-template-columns: repeat(auto-fit, minmax(19rem, 1fr));
  justify-items: center;
  border: 5px solid blue;
`;
export default Inventory;
