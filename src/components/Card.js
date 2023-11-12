import React from 'react';
import './Card.css';
import NoImage from '../assets/no-image-available.jpg';
function Card({ inventoryItem, isItemInCart }) {
  const hasImage = inventoryItem.url ? true : false;

  return (
    <div className="card">
      <div className="image-container">
        <img src={hasImage ? inventoryItem.url : NoImage} alt="article" />
      </div>
      <div className="card-footer">
        <h3>{inventoryItem.manufacturerName}</h3>
        <p>{inventoryItem.description}</p>
      </div>{' '}
      <a href="#" className="add-to-cart">
        Add To Cart <span>&rarr;</span>
      </a>
    </div>
  );
}

export default Card;
