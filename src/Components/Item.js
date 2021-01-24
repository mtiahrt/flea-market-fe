import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
import {
  CardWrapper,
  CardHeader,
  CardHeading,
  CardBody,
  CardFieldset,
  CardOptionsNote,
  CardButton,
} from "../SharedComponents/Card";

const Item = ({ name, manufacturerName, description, price }) => {
  return (
    <CardWrapper className="sale-item">
      <StyledIcon icon={faHeart} />
      <CardHeader>
        <CardHeading>{name}</CardHeading>
      </CardHeader>
      <CardBody>
        <CardFieldset>
          <CardOptionsNote>{manufacturerName}</CardOptionsNote>
          <CardOptionsNote>{description}</CardOptionsNote>
          <CardOptionsNote>Price {price}</CardOptionsNote>
        </CardFieldset>
        <CardFieldset>
          <CardButton>View Details</CardButton>
        </CardFieldset>
      </CardBody>
    </CardWrapper>
  );
};

const StyledIcon = styled(FontAwesomeIcon)`
  padding: 4%;
`;
export default Item;
