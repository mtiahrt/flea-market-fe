import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import BasicCard from './BasicCard';
import { CARD_ITEM } from '../queries/graphQL';
import { UserProfileContext } from '../Contexts/LoginContext';

const ItemList = () => {
  const { cartItems, setCartItems } = useContext(UserProfileContext);
  const { loading, error, data } = useQuery(CARD_ITEM);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  function isItemAlreadyInCart(id) {
    if (cartItems && cartItems.includes(id)) {
      return true;
    }
  }

  function updateCart(id) {
    isItemAlreadyInCart(id)
      ? setCartItems((prev) => prev.filter(item => item !== id))
      : setCartItems((prev) => [...prev, id]);
  }

  return (
    <StyledList className='item-list'>
      {data.saleItemsList.map((item) => (
        <BasicCard
          key={`card${item.id.toString()}`}
          iconColor={isItemAlreadyInCart(item.id) ? 'primary' : 'disabled'}
          link={`DetailedItem/${item.id}`} cardData={item}
          cartClickHandler={() => updateCart(item.id)}
        >
        </BasicCard>
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
