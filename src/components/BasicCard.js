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
import { UserContext } from '../contexts/UserContext';
import { Link } from 'react-router-dom';

export default function BasicCard({
  inventoryItem,
  link,
  isItemInCart,
  isMobleView,
}) {
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
  const { addToCart, removeFromCart } = useCart();
  const [isInCart, setIsInCart] = useState(isItemInCart);
  const cartId = inventoryItem.cartsList[0]?.id;
  const inventoryId = inventoryItem.id;

  function handleCartClick() {
    //TODO: Add snackbar messaging
    if (!user) {
      setUser({ ...user, displayLogin: true });
      return;
    }

    isInCart
      ? removeFromCart(cartId, () =>
          deleteingCartItem({ variables: { cartId } })
        )
      : addToCart(inventoryId, 1, () =>
          addingCartItem({
            variables: {
              inventoryId: inventoryId,
              quantity: 1,
              userId: user?.id,
            },
          })
        );

    setIsInCart((prev) => !prev);
  }
  const hasImage = inventoryItem.itemImagesList[0]?.url;
  return (
    <Card
      sx={{
        boxShadow: 5,
        borderRadius: '8px',
        maxWidth: isMobleView ? 290 : 345,
      }}
    >
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
        <CardContent sx={{ borderTop: '1px solid #eee' }}>
          <Typography
            color="text.secondary"
            gutterBottom
            variant="h5"
            component="div"
          >
            {inventoryItem.manufacturerName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {inventoryItem.description}
          </Typography>
        </CardContent>
      </Link>
      <CardActions>
        <Button onClick={handleCartClick} size="small">
          {isInCart && user?.id ? 'Remove from Cart' : 'Add To Cart'}
        </Button>
      </CardActions>
    </Card>
  );
}
