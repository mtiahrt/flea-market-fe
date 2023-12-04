import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQuery } from '@apollo/client';
import { useHistory, useParams } from 'react-router-dom';
import ImagesTile from './shared/ImagesTile';
import {
  ADD_CART_ITEM,
  DELETE_CART_ITEM,
  GET_INVENTORY_ITEM,
  UPDATE_CART_QUANTITY,
} from '../queries/graphQL';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useCart } from '../contexts/CartContext';
import { UserContext } from '../contexts/UserContext';
import { useSnackbar } from '../hooks/useSnackbar';
import { Snackbar } from './shared/Snackbar';

function DetailedItem() {
  const { isActive, message, openSnackBar } = useSnackbar();
  const { removeFromCart, updateQuantity, addToCart, cartItems } = useCart();
  const { user, setUser } = useContext(UserContext);

  const [
    addingCartItem,
    {
      loading: loadingAddCartItem,
      error: errorAddCartItem,
      data: dataAddCartItem,
    },
  ] = useMutation(ADD_CART_ITEM);
  const [
    deleteingCartItem,
    {
      loading: loadingDeleteCartItem,
      error: errorDeleteCartItem,
      data: dataDeleteCartItem,
    },
  ] = useMutation(DELETE_CART_ITEM);

  const [
    updatingCartQuantity,
    {
      loading: loadingUpdateCartQuantity,
      error: errorUpdateCartQuantity,
      data: dataUpdateCartQuantity,
    },
  ] = useMutation(UPDATE_CART_QUANTITY);

  const history = useHistory();
  const { id } = useParams();
  const cartItem = cartItems?.find((item) => item.inventoryId === Number(id));
  const [quantity, setQuantity] = useState(0);
  const [isInCart, setIsInCart] = useState(cartItem ? true : false);
  const { loading, error, data } = useQuery(GET_INVENTORY_ITEM, {
    variables: { inventoryId: Number(id) },
  });
  useEffect(() => {
    let quantity = 1;
    if (data && isInCart) {
      quantity = cartItem.quantity;
    }
    setQuantity(quantity);
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  const cartId = cartItem ? cartItem.cartId : -1;
  const handleQuantitySelectChange = (e) => {
    const quantity = +e.target.value;
    if (isInCart) {
      updateQuantity(cartId, id, quantity, () =>
        updatingCartQuantity({ variables: { cartId, quantity } })
      );
    }
    setQuantity(quantity);
  };
  const getQuantityDropDownOptions = (quantity) => {
    let returnValue = [];
    for (let i = 1; quantity >= i; i++) {
      returnValue.push(
        <MenuItem key={`quantityKey${i}`} value={i}>
          {i}
        </MenuItem>
      );
    }
    return returnValue;
  };

  function navigateToEditItem(id) {
    history.push({
      pathname: `/EditItem/${id}`,
      state: {
        fileDataURL: data.inventory.itemImagesList,
        isInCart,
      },
    });
  }

  const handleAddOrRemoveFromCartClick = () => {
    if (!user?.isLoggedIn) {
      setUser({ ...user, displayLogin: true });
      return;
    }
    setIsInCart(!isInCart);
    isInCart
      ? removeFromCart(cartId, () =>
          deleteingCartItem({ variables: { cartId } })
        )
      : addToCart(Number(id), quantity, () =>
          addingCartItem({
            variables: {
              inventoryId: Number(id),
              quantity: quantity,
              userId: user?.id,
            },
          })
        );

    openSnackBar(
      isInCart
        ? 'Item was removed from cart successfully'
        : 'Item was added to cart successfully'
    );
  };
  console.log('detailItem component is rendering');
  return (
    <StyledDiv className="detail-container">
      <StyledH2>Item Details</StyledH2>
      <StyledH4>Name: {data.inventory.name}</StyledH4>
      <StyledH4>Manufacturer Name: {data.inventory.manufacturerName}</StyledH4>
      <StyledH4>Description: {data.inventory.description}</StyledH4>
      <StyledH4>Price: {data.inventory.price}</StyledH4>
      <FormControl
        sx={{
          margin: '.4em 0 .4em 0',
          width: {
            xs: 100, // theme.breakpoints.up('xs')
            sm: 200, // theme.breakpoints.up('sm')
            md: 300, // theme.breakpoints.up('md')
            lg: 400, // theme.breakpoints.up('lg')
            xl: 500, // theme.breakpoints.up('xl')
          },
        }}
      >
        <InputLabel sx={{ zIndex: '0' }} id="quantity-select-label">
          Quantity
        </InputLabel>
        <Select
          labelId="quantity-select-label"
          value={quantity}
          label="Quantity"
          disabled={data.inventory.quantity < 1}
          onChange={handleQuantitySelectChange}
        >
          {getQuantityDropDownOptions(data.inventory.quantity)}
        </Select>
      </FormControl>
      <ImagesTile fileDataURL={data.inventory.itemImagesList} />
      <StyledButtonsDiv className="buttons">
        <Button onClick={handleAddOrRemoveFromCartClick} variant="contained">
          {isInCart ? 'Remove from cart' : 'Add to Cart'}
        </Button>
        <Button onClick={() => navigateToEditItem(id)} variant="contained">
          Edit Item
        </Button>
      </StyledButtonsDiv>
      <Snackbar isActive={isActive} message={message} />
    </StyledDiv>
  );
}

export default DetailedItem;
const StyledDiv = styled.div`
  margin: var(--margin-web);
  display: flex;
  background-color: var(--logo-fill-color);
  padding: 3rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.2rem;
  border-radius: var(--border-radius);
  @media (max-width: 40em) {
    padding: 1rem;
    .detail-container {
      align-items: center;
    }
    margin: var(--margin-mobile);
    h2,
    h4 {
      align-self: flex-start;
    }

    .buttons {
      flex-direction: column;
      gap: 0.4rem;
    }

    button {
      width: 100%;
    }
  }
`;
const StyledH2 = styled.h2`
  margin: 0.5rem;
`;
const StyledH4 = styled.h4`
  margin: 0.5rem;
`;

const StyledButtonsDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  margin-top: 0.6rem;

  button {
    width: 48%;
  }

  @media (max-width: 40em) {
    flex-direction: column;
    gap: 0.4rem;
    button {
      width: 100%;
    }
  }
`;
