import React from 'react';
import Heart from './shared/Heart.js';
import {
  CardWrapper,
  CardHeader,
  CardHeading,
  CardBody,
  CardFieldset,
  CardOptionsNote,
} from './shared/Card';

console.log('Item component is rendering');

const Item = ({ name, manufacturerName, description, price }) => {
  return (
    <CardWrapper className="sale-item">
      <Heart></Heart>
      <CardHeader>
        <CardHeading>{manufacturerName}</CardHeading>
      </CardHeader>
      <CardBody>
        <CardFieldset>
          <CardOptionsNote>{name}</CardOptionsNote>
          <CardOptionsNote>{description}</CardOptionsNote>
          <CardOptionsNote>Price ${price}</CardOptionsNote>
        </CardFieldset>
      </CardBody>
    </CardWrapper>
  );
};
export default Item;
