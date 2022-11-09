import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import { ShoppingCart } from '@mui/icons-material';
import NoImage from '../assets/no-image-available.jpg';
import { Link } from 'react-router-dom';

export default function BasicCard({ cartItem, link, iconColor, cartClickHandler }) {
  const cartItemId = cartItem.cartsList[0]?.id
  return (
    <Card data-cart-id={cartItemId} variant='outlined' sx={{ width: 320 }}>
      <Typography level='h2' fontSize='lg' fontWeight='lg' sx={{ mb: 0.5 }}>
        {cartItem.manufacturerName}
      </Typography>
      <Typography level='body2'>{cartItem.name}</Typography>
      <IconButton
        aria-label={cartItem.manufacturerName}
        variant='plain'
        color='neutral'
        size='sm'
        sx={{ position: 'absolute', top: '0.5rem', right: '-3.5rem' }}
      >
        <ShoppingCart color={iconColor} onClick={() => cartClickHandler(cartItemId, cartItem.id)} />
      </IconButton>
      <AspectRatio minHeight='120px' maxHeight='200px' sx={{ my: 2 }}>
        <Link to={link}>
          <img style={{ width: '85%' }}
               src={cartItem.itemImagesList.length > 0 ? cartItem.itemImagesList.find(x => x).url : NoImage}
               srcSet={`${cartItem ? cartItem.url : NoImage} 2x`}
               loading='lazy'
               alt=''
          />
        </Link>
      </AspectRatio>
      <Box sx={{ display: 'flex' }}>
        <div>
          <Typography level='body3'>Total price:</Typography>
          <Typography fontSize='lg' fontWeight='lg'>
            ${cartItem.price}
          </Typography>
        </div>
      </Box>
    </Card>
  );
}
