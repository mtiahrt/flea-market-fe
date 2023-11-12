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
import styled from 'styled-components';

export default function BasicCard({ inventoryItem, isItemInCart }) {
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
  const cartId = inventoryItem.cartid;
  const inventoryId = inventoryItem.inventoryid;

  function handleCartClick(e) {
    //TODO: Add snackbar messaging
    e.currentTarget.previousSibling.classList.add('send-to-cart');
    // if (!user?.isLoggedIn) {
    //   setUser({ ...user, displayLogin: true });
    //   return;
    // }
    //
    // isInCart
    //   ? removeFromCart(cartId, () =>
    //       deleteingCartItem({ variables: { cartId } })
    //     )
    //   : addToCart(inventoryId, 1, () =>
    //       addingCartItem({
    //         variables: {
    //           inventoryId: inventoryId,
    //           quantity: 1,
    //           userId: user?.id,
    //         },
    //       })
    //     );
    //
    // setIsInCart((prev) => !prev);
  }
  const hasImage = inventoryItem.url ? true : false;
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 5,
        borderRadius: '8px',
      }}
    >
      <Link
        to={{
          pathname: `../detailedItem/${inventoryItem.inventoryid}`,
        }}
      >
        <CardMedia
          component="img"
          style={hasImage ? {} : { backgroundSize: 'contain' }}
          image={hasImage ? inventoryItem.url : NoImage}
          title={inventoryItem.inventoryname}
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
      <CardActions sx={{ flexGrow: '1' }}>
        <StyledSpan className="cart-item"></StyledSpan>

        <Button
          sx={{ alignSelf: 'flex-end' }}
          onClick={(e) => handleCartClick(e)}
          size="small"
        >
          {isInCart && user?.id ? 'Remove from Cart' : 'Add To Cart'}
        </Button>
      </CardActions>
    </Card>
  );
}

const StyledSpan = styled.span`
  //height: 24px;
  //width: 24px;
  //top: -10px;
  //right: -10px;
  &:before {
    position: absolute;
    left: 30px;
    z-index: 100;
    content: '1';
    display: block;
    line-height: 24px;
    height: 24px;
    width: 24px;
    font-size: 12px;
    font-weight: 600;
    background: var(--logo-background-color);
    color: white;
    border-radius: 20px;
    text-align: center;
  }
`;
