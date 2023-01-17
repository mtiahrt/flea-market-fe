import React from 'react';
import NoImage from '../assets/no-image-available.jpg';
import AspectRatio from '@mui/joy/AspectRatio';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import { Link } from 'react-router-dom';

const ProductDetails = ({ productDetails, link, isInCart }) => {
  const hasImage = () => productDetails.itemImagesList.length > 0;

  return (
    <div>
      <Typography level="h2" fontSize="lg" fontWeight="lg" sx={{ mb: 0.5 }}>
        {productDetails.manufacturerName}
      </Typography>
      <Typography level="body2">{productDetails.name}</Typography>
      <AspectRatio minHeight="120px" maxHeight="200px" sx={{ my: 2 }}>
        <Link to={{ pathname: link, state: { isInCart: isInCart } }}>
          <img
            data-id={productDetails.id}
            className="product-image"
            style={{ width: '85%' }}
            src={
              hasImage()
                ? productDetails.itemImagesList.find((x) => x).url
                : NoImage
            }
            srcSet={`${productDetails ? productDetails.url : NoImage} 2x`}
            loading="lazy"
            alt={hasImage() ? 'Product image' : 'No Image'}
          />
        </Link>
      </AspectRatio>
      <Box sx={{ display: 'flex' }}>
        <div>
          <Typography level="body3">Total price:</Typography>
          <Typography fontSize="lg" fontWeight="lg">
            ${productDetails.price}
          </Typography>
        </div>
      </Box>
    </div>
  );
};

export default ProductDetails;
