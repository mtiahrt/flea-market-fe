import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@mui/material';
import styled from 'styled-components';

export const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const paymentHandler = async e => {
    e.preventDefault();
    if(!stripe || !elements){
      return;
    }
  };

  return (
    <StyledPaymentDiv>
      <StyledPaymentForm>
        <h2>Credit Card</h2>
        <CardElement />
        <Button>Pay now</Button>
      </StyledPaymentForm>
    </StyledPaymentDiv>
  );
};

const StyledPaymentDiv = styled.div`
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 0 10%;
`;
const StyledPaymentForm = styled.form`
  height: 100px;
  min-width: 500px;
`;