import React, {
  useContext,
  useEffect,
  useReducer,
  useMemo,
  useState,
} from 'react';
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
  const [showFilter, setShowFilter] = useState(false);
  const [state, dispatch] = useReducer(filterReducer, []);
  const { userProfile } = useContext(UserProfileContext);
  const { loadCartItems } = useCart();
  const { loading, error, data } = useQuery(INVENTORY_LIST, {
    variables: {
      applicationUserId: userProfile.id,
    },
    fetchPolicy: 'cache-and-network',
  });
  const categories = useMemo(() => reduceCategories(data), [data]);

  useEffect(() => {
    console.log('Inventory use effect fired...');
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
  console.log('Inventory is rendering');

  function reduceCategories(data) {
    if (!data) {
      return [];
    }
    console.log('reduce fired');
    const categoriesMap = data.inventoriesList.reduce((map, item) => {
      const categoryId = item.subcategory.category.id;
      const subcategoryId = item.subcategory.id;

      if (!map.has(categoryId)) {
        map.set(categoryId, {
          id: categoryId,
          name: item.subcategory.category.name,
          subcategories: [],
        });
      }

      const category = map.get(categoryId);
      if (!category.subcategories.some((x) => x.id === subcategoryId)) {
        category.subcategories.push({
          id: subcategoryId,
          name: item.subcategory.name,
        });
      }

      return map;
    }, new Map());

    return Array.from(categoriesMap.values());
  }
  return (
    <>
      <StyledDiv>
        <InventoryFilter
          categories={categories ? categories : []}
          dispatchFilter={dispatch}
          showComponent={showFilter}
          showComponentClickHandler={() => setShowFilter(!showFilter)}
        />
        <StyledInventory role="item-list">
          {data.inventoriesList.filter(filterFunction).map((item) => (
            <BasicCard
              key={`card${item.id.toString()}`}
              isItemInCart={item.cartsList.length ? true : false}
              link={`DetailedItem/${item.id}`}
              inventoryItem={item}
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
  grid-template-columns: repeat(auto-fit, minmax(20rem, 0.7fr));
  justify-content: center;
`;
export default Inventory;
