import * as React from 'react';
import Card from '@mui/joy/Card';
import IconButton from '@mui/joy/IconButton';
import { ShoppingCart } from '@mui/icons-material';
import { useContext, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { ADD_CART_ITEM, DELETE_CART_ITEM } from '../queries/graphQL';

import ProductDetails from './ProductDetails';
import { useMutation } from '@apollo/client';
import { UserProfileContext } from '../contexts/UserContext';

export default function BasicCard({ inventoryItem, link, isItemInCart }) {
  const { userProfile } = useContext(UserProfileContext);
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
  const { addToCart, removeFromCart } = useCart();
  const [isInCart, setIsInCart] = useState(isItemInCart);
  const cartId = inventoryItem.cartsList[0]?.id;
  const inventoryId = inventoryItem.id;

  function handleCartClick() {
    //TODO: Add snackbar messaging
    isInCart
      ? removeFromCart(cartId, () =>
          deleteingCartItem({ variables: { cartId } })
        )
      : addToCart(inventoryId, 1, () =>
          addingCartItem({
            variables: {
              inventoryId: inventoryId,
              quantity: 1,
              userId: userProfile.id,
            },
          })
        );

    setIsInCart((prev) => !prev);
  }
  return (
    <div>
      <Card data-cart-id={cartId} variant="outlined" sx={{ width: 320 }}>
        <IconButton
          style={buttonStyles}
          aria-label={inventoryItem.manufacturerName}
          variant="plain"
          color="neutral"
          size="sm"
          onClick={handleCartClick}
          sx={{ position: 'absolute', top: '0.5rem', right: '-3.5rem' }}
        >
          <ShoppingCart
            role="cart-icon"
            color={isInCart ? 'primary' : 'disabled'}
          />
        </IconButton>
        <ProductDetails
          productDetails={inventoryItem}
          link={link}
          isInCart={isInCart}
        />
      </Card>
    </div>
  );
}

const buttonStyles = {
  width: '48%',
  margin: '.5% 0 .5% 0 !important',
  alignSelf: 'center',
};
