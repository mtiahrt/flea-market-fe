import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import NoImage from '../assets/no-image-available.jpg';
import { Link } from 'react-router-dom';

export default function BasicCard({ cardData, link }) {
  console.log('item is', cardData);
  console.log('link is', link);
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
        <BookmarkAdd />
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
        <Button
          variant='solid'
          size='sm'
          color='primary'
          aria-label='Explore Bahamas Islands'
          sx={{ ml: 'auto', fontWeight: 600 }}
        >
          Explore
        </Button>
      </Box>
    </Card>
  );
}
