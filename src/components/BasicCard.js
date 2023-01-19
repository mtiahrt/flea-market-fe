import * as React from 'react';
import Card from '@mui/joy/Card';
import IconButton from '@mui/joy/IconButton';
import { ShoppingCart } from '@mui/icons-material';
import useCart from '../hooks/useCart';
import { useState } from 'react';
import ProductDetails from './ProductDetails';

export default function BasicCard({ inventoryItem, link, isItemInCart }) {
  const [setAddItemToCart, , setRemoveItemFromCart] = useCart();
  const [isInCart, setIsInCart] = useState(isItemInCart);
  const cartId = inventoryItem.cartsList[0]?.id;
  const inventoryId = inventoryItem.id;

  function handleCartClick() {
    isInCart ? setRemoveItemFromCart(cartId) : setAddItemToCart(inventoryId);
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
