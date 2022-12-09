import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import { ShoppingCart } from '@mui/icons-material';
import NoImage from '../assets/no-image-available.jpg';
import { Link } from 'react-router-dom';
import useCart from '../CustomHooks/useCart';

export default function BasicCard({ inventoryItem, link, isInCart }) {
  const cartItemId = inventoryItem.cartsList[0]?.id;
  const [setCartItem] = useCart(inventoryItem.id);
  return (
    <Card data-cart-id={cartItemId} variant="outlined" sx={{ width: 320 }}>
      <Typography level="h2" fontSize="lg" fontWeight="lg" sx={{ mb: 0.5 }}>
        {inventoryItem.manufacturerName}
      </Typography>
      <Typography level="body2">{inventoryItem.name}</Typography>
      <IconButton
        style={buttonStyles}
        aria-label={inventoryItem.manufacturerName}
        variant="plain"
        color="neutral"
        size="sm"
        sx={{ position: 'absolute', top: '0.5rem', right: '-3.5rem' }}
      >
        <ShoppingCart
          color={isInCart ? 'primary' : 'disabled'}
          onClick={() => setCartItem(cartItemId)}
        />
      </IconButton>
      <AspectRatio minHeight="120px" maxHeight="200px" sx={{ my: 2 }}>
        <Link to={{pathname: link, state:{isInCart: isInCart}}}>
          <img
            style={{ width: '85%' }}
            src={
              inventoryItem.itemImagesList.length > 0
                ? inventoryItem.itemImagesList.find((x) => x).url
                : NoImage
            }
            srcSet={`${inventoryItem ? inventoryItem.url : NoImage} 2x`}
            loading="lazy"
            alt=""
          />
        </Link>
      </AspectRatio>
      <Box sx={{ display: 'flex' }}>
        <div>
          <Typography level="body3">Total price:</Typography>
          <Typography fontSize="lg" fontWeight="lg">
            ${inventoryItem.price}
          </Typography>
        </div>
      </Box>
    </Card>
  );
}

const buttonStyles = {
  width: '48%',
  margin: '.5% 0 .5% 0 !important',
  alignSelf: 'center',
};
