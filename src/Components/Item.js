import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as selectedFaHeart } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import styled from "styled-components";
import { fade } from "../animation";
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
  const [heartSelected, setHeartSelected] = useState(false);

  const handleClickIconEvent = (e) => {
    setHeartSelected(!heartSelected);
  };
  return (
    <CardWrapper className="sale-item">
      <StyledIcon
        icon={heartSelected ? selectedFaHeart : faHeart}
        onClick={handleClickIconEvent}
        variants={fade}
      />
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
  cursor: pointer;
  color: #e5195f;
`;
export default Item;
