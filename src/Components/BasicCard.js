import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import { ShoppingCart } from '@mui/icons-material';
import NoImage from '../assets/no-image-available.jpg';
import { Link } from 'react-router-dom';

export default function BasicCard({ cardData, link, iconColor, cartClickHandler }) {
  return (
    <Card variant='outlined' sx={{ width: 320 }}>
      <Typography level='h2' fontSize='lg' fontWeight='lg' sx={{ mb: 0.5 }}>
        {cardData.manufacturerName}
      </Typography>
      <Typography level='body2'>{cardData.name}</Typography>
      <IconButton
        aria-label={cardData.manufacturerName}
        variant='plain'
        color='neutral'
        size='sm'
        sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
      >
        <ShoppingCart onClick={cartClickHandler} color={iconColor} />
      </IconButton>
      <AspectRatio minHeight='120px' maxHeight='200px' sx={{ my: 2 }}>
        <Link to={link}>
          <img
            src={cardData.itemImagesList.length > 0 ? cardData.itemImagesList.find(x => x).url : NoImage}
            srcSet={`${cardData ? cardData.url : NoImage} 2x`}
            loading='lazy'
            alt=''
          />
        </Link>
      </AspectRatio>
      <Box sx={{ display: 'flex' }}>
        <div>
          <Typography level='body3'>Total price:</Typography>
          <Typography fontSize='lg' fontWeight='lg'>
            ${cardData.price}
          </Typography>
        </div>
      </Box>
    </Card>
  );
}
