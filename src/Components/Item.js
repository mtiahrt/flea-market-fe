import React from "react";
import Heart from "../SharedComponents/Heart.js";
import {
  CardWrapper,
  CardHeader,
  CardHeading,
  CardBody,
  CardFieldset,
  CardOptionsNote,
  CardButton,
} from "../SharedComponents/Card";

const Item = ({ id, name, manufacturerName, description, price }) => {
  return (
    <CardWrapper key={id} className="sale-item">
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
        <CardFieldset>
          <CardButton>View Details</CardButton>
        </CardFieldset>
      </CardBody>
    </CardWrapper>
  );
};
export default Item;
