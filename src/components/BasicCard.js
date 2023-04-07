import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import NoImage from '../assets/no-image-available.jpg';
import { useContext, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { ADD_CART_ITEM, DELETE_CART_ITEM } from '../queries/graphQL';
import { useMutation } from '@apollo/client';
import { UserProfileContext } from '../contexts/UserContext';
import { Link } from 'react-router-dom';

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
  const hasImage = inventoryItem.itemImagesList[0]?.url;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link
        to={{
          pathname: link,
          state: { inventoryId: inventoryItem.id, isInCart: isInCart },
        }}
      >
        <CardMedia
          style={hasImage ? {} : { backgroundSize: 'contain' }}
          sx={{ height: 200 }}
          image={hasImage ? inventoryItem.itemImagesList[0].url : NoImage}
          title={inventoryItem.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {inventoryItem.manufacturerName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {inventoryItem.description}
          </Typography>
        </CardContent>
      </Link>
      <CardActions>
        <Button onClick={handleCartClick} size="small">
          Add To Cart
        </Button>
      </CardActions>
    </Card>
  );
}
