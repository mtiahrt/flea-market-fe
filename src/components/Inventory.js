import React, { useContext, useEffect, useState, useReducer } from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import BasicCard from './BasicCard';
import { INVENTORY_LIST } from '../queries/graphQL';
import { UserProfileContext } from '../contexts/UserContext';
import { useCart } from '../contexts/CartContext';
import CartContextModel from '../models/CartContextModel';
import InventoryFilter from './InventoryFilter';

function filterReducer(state, action) {
  switch (action.type) {
    case 'added_subcategory': {
      return state.find((c) => c.categoryId === action.categoryId)
        ? state.map((item) => {
            if (item.categoryId === action.categoryId) {
              return {
                categoryId: action.categoryId,
                subcategoryIds: [...item.subcategoryIds, action.subcategoryId],
              };
            } else {
              return item;
            }
          })
        : [
            ...state,
            {
              categoryId: action.categoryId,
              subcategoryIds: [action.subcategoryId],
            },
          ];
    }
    case 'removed_subcategory': {
      if (state.length === 1 && state[0].subcategoryIds.length === 1) {
        return [];
      }
      if (
        state.find((x) => x.categoryId === action.categoryId).subcategoryIds
          .length <= 1
      ) {
        return state.filter((x) => x.categoryId !== action.categoryId);
      }
      return state.map((item) => {
        if (item.categoryId === action.categoryId) {
          return item.subcategoryIds.length <= 1
            ? state.filter((x) => x.categoryId !== action.categoryId)
            : {
                ...item,
                subcategoryIds: item.subcategoryIds.filter(
                  (x) => x !== action.subcategoryId
                ),
              };
        } else {
          return item;
        }
      });
    }
    case 'added_category': {
      return [
        ...state,
        {
          categoryId: action.categoryId,
          subcategoryIds: action.subcategoryIds,
        },
      ];
    }
    case 'removed_category': {
      return state.filter((x) => x.categoryId !== action.categoryId);
    }
  }
}
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

  const filterFunction = (inventoryItem) =>
    state.length === 0
      ? true
      : state.some(
          (x) =>
            x.categoryId === inventoryItem.subcategory.categoryId &&
            x.subcategoryIds.includes(inventoryItem.subcategoryId)
        );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log('Item List data is :', data);
  return (
    <>
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
      <InventoryFilter
        categories={
          data
            ? data.inventoriesList
                .map((item) => ({
                  id: item.subcategory.category.id,
                  name: item.subcategory.category.name,
                  subcategories: data.inventoriesList
                    .filter(
                      (x) =>
                        x.subcategory.category.id ===
                        item.subcategory.category.id
                    )
                    .filter((obj, index, self) => {
                      return (
                        index ===
                        self.findIndex(
                          (t) => t.subcategoryId === obj.subcategoryId
                        )
                      );
                    })
                    .map((x) => ({
                      id: x.subcategory.id,
                      name: x.subcategory.name,
                    })),
                }))
                .filter((obj, index, self) => {
                  return index === self.findIndex((t) => t.id === obj.id);
                })
            : []
        }
        dispatchFilter={dispatch}
      />
    </>
  );
};
const StyledInventory = styled.div`
  display: grid;
  margin: 25px;
  gap: 25px;
  grid-template-columns: repeat(auto-fit, minmax(19rem, 1fr));
  justify-items: center;
`;
export default Inventory;
