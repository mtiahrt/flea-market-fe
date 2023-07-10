import React, {
  useEffect,
  useReducer,
  useMemo,
  useState,
  useContext,
} from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import BasicCard from './BasicCard';
import { INVENTORY_LIST_AND_CART_ITEMS } from '../queries/graphQL';
import { useCart } from '../contexts/CartContext';
import CartContextModel from '../models/CartContextModel';
import InventoryFilter from './InventoryFilter';
import filterReducer from './InventoryFilterReducer';
import { UserContext } from '../contexts/UserContext';

const Inventory = () => {
  const [showFilter, setShowFilter] = useState(false);
  const { user } = useContext(UserContext);
  const [state, dispatch] = useReducer(filterReducer, []);
  const { loadCartItems } = useCart();

  const { loading, error, data } = useQuery(INVENTORY_LIST_AND_CART_ITEMS, {
    variables: {
      applicationUserId: user?.id,
    },
    fetchPolicy: 'cache-and-network',
  });

  const categories = useMemo(() => reduceCategories(data), [data]);

  useEffect(() => {
    console.log('Inventory use effect fired...');
    if (data?.inventoriesList.cartItems) {
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
  }, [data]);

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
          {data?.inventoriesList.filter(filterFunction).map((item) => (
            <BasicCard
              key={`card${item.id.toString()}`}
              isItemInCart={item.cartsList?.length && user ? true : false}
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
  grid-template-columns: repeat(auto-fit, minmax(16rem, 0.7fr));
  justify-content: center;
  margin-right: 1rem;
`;
export default Inventory;
