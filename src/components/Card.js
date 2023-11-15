import React from 'react';
import './Card.css';
import NoImage from '../assets/no-image-available.jpg';
import { useContext, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { ADD_CART_ITEM, DELETE_CART_ITEM } from '../queries/graphQL';
import { useMutation } from '@apollo/client';
import { UserContext } from '../contexts/UserContext';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

function Card({ inventoryItem, isItemInCart }) {
  const hasImage = inventoryItem.url ? true : false;
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
  const [mouseOnCard, setMouseOnCard] = useState(false);
  const cartId = inventoryItem.cartid;
  const inventoryId = inventoryItem.inventoryid;

  function handleCartClick(e) {
    //TODO: Add snackbar messaging
    e.currentTarget.classList.add('send-to-cart');
    if (!user?.isLoggedIn) {
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

  return (
    <div
      onMouseLeave={(e) => setMouseOnCard(false)}
      onMouseEnter={(e) => setMouseOnCard(true)}
      className="card"
    >
      <div className="card-image-container">
        <Link
          to={{
            pathname: `../detailedItem/${inventoryItem.inventoryid}`,
          }}
        >
          <img src={hasImage ? inventoryItem.url : NoImage} alt="article" />
        </Link>
      </div>
      <div className="card-footer">
        <h3>{inventoryItem.manufacturerName}</h3>
        <p>{inventoryItem.description}</p>
      </div>
      <a href="#" onClick={(e) => handleCartClick(e)} className="add-to-cart">
        {isItemInCart && user?.id ? 'Remove from Cart' : 'Add To Cart'}
      </a>
      <CSSTransition timeout={0.5} in={mouseOnCard} classNames="card-hover">
        <div className="slider"></div>
      </CSSTransition>
    </div>
  );
}

export default Card;
