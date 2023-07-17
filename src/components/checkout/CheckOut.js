import * as React from 'react';
import ShoppingCart from './ShoppingCart';
import CustomerBillingInformation from './CustomerBillingInformation';
import styled from 'styled-components';

export default function CheckOut() {
  return (
    <StyledDiv>
      <CustomerBillingInformation style={{ flexShrink: 3 }} />
      <ShoppingCart style={{ flexShrink: 1 }} />
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  margin: 0 10%;
  display: flex;
  flex-direction: row;
  gap: 2rem;
  @media (max-width: 40em) {
    margin: var(--margin-mobile);
    flex-direction: column;
  }
`;
