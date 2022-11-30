import * as React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import {
  Button,
  InputLabel,
  Select,
  Checkbox,
  MenuItem,
  FormControlLabel,
  FormControl,
  Divider,
} from '@mui/material';
import axios from 'axios';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import states from '../../assets/data/states.json';
import { useState } from 'react';
import { CustomTextbox } from '../Textbox/CustomTextbox';

export default function CustomerBillingInformation() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { billingState, setBillingState } = useState();
  const stripe = useStripe();
  const elements = useElements();
  const handlePaymentSubmit = async (paymentData, e) => {
    const clientSecret = await axios
      .post(
        'https://uvvhidm2fnw6kbmbivkx35tlc40ikmmv.lambda-url.us-east-1.on.aws/',
        { amount: 1000 },
        {
          headers: {
            'content-type': 'text/plain',
          },
        }
      )
      .then((response) => response.data.paymentIntent.client_secret);
    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Marky Mark',
        },
      },
    });
    if (paymentResult.error) {
      alert(paymentResult.error);
      return;
    }
    if (paymentResult.paymentIntent.status === 'succeeded') {
      //TODO: update inventory and purchased tables
      alert('payment is good!!!');
    }
  };
  const onError = (e) => {
    console.error('Error in form submission', e.state);
  };

  const getStates = () =>
    states.map((state) => (
      <MenuItem
        key={`stateKey${state.id}`}
        data-abbr={state.abbr}
        value={state.id}
      >
        {state.name}
      </MenuItem>
    ));

  return (
    <StyledForm onSubmit={handleSubmit(handlePaymentSubmit, onError)}>
      <Typography style={{ width: '100%' }} variant="h4">
        Customer Information
      </Typography>
      <TextField
        style={textFieldStyles}
        {...register('firstName', { required: true })}
        id="firstName"
        label="First Name"
        autoComplete="first-name"
        variant="standard"
      />
      {errors.name?.type === 'required' && 'Name is required'}
      <TextField
        style={textFieldStyles}
        {...register('lastName', { required: true })}
        id="lastName"
        label="Last Name"
        autoComplete="last-name"
        variant="standard"
      />
      {/*First usage of CustomTextbox */}
      <CustomTextbox
        style={{ width: '100%' }}
        {...register('email', { required: true })}
      />
      {/*<TextField style={textFieldStyles}*/}
      {/*           id='email'*/}
      {/*           label='Email'*/}
      {/*           autoComplete='email'*/}
      {/*           variant='standard'*/}
      {/*/>*/}
      <TextField
        style={{ ...textFieldStyles, width: '100%' }}
        {...register('address', { required: true })}
        id="address"
        label="Address"
        autoComplete="address"
        variant="standard"
      />
      <TextField
        style={{ ...textFieldStyles }}
        {...register('city', { required: true })}
        id="city"
        label="City"
        autoComplete="city"
        variant="standard"
      />

      <FormControl style={stateSelectStyles}>
        <InputLabel id="demo-simple-select-label">State</InputLabel>
        <Select
          {...register('state', { required: true })}
          labelId="state-select-label"
          label="State"
          // onChange={handleStateSelectChange}
        >
          {getStates()}
        </Select>
      </FormControl>
      <TextField
        style={textFieldStyles}
        {...register('zip', { required: true })}
        id="zip"
        label="Zip"
        autoComplete="zip"
        variant="standard"
      />
      <Divider style={{ width: '100%' }} />
      <StyledPaymentDiv>
        <StyledPaymentForm>
          <Typography variant="h4" gutterBottom>
            Credit Card
          </Typography>
          <CardElement />
          <Button>Pay now</Button>
        </StyledPaymentForm>
      </StyledPaymentDiv>
      <Divider style={{ flexGrow: '1', flexShrink: '1', width: '100%' }} />
      <Typography
        style={{ margin: '10px 0px 0px 0px', width: '100%' }}
        variant="h4"
        gutterBottom
      >
        Billing Address
      </Typography>
      <FormControlLabel
        style={{ width: '100%' }}
        control={<Checkbox defaultChecked />}
        label="Same as Shipping address"
      />
      <TextField
        style={textFieldStyles}
        {...register('billingFirstName', { required: true })}
        id="billingFirstName"
        label="First Name"
        autoComplete="first-name"
        variant="standard"
      />
      {errors.name?.type === 'required' && 'Billing name is required'}
      <TextField
        style={{ ...textFieldStyles, width: '50%' }}
        {...register('billingLastName', { required: true })}
        id="billingLastName"
        label="Last Name"
        autoComplete="last-name"
        variant="standard"
      />
      <TextField
        style={{ ...textFieldStyles, width: '100%' }}
        {...register('billingAddress', { required: true })}
        id="billingAddress"
        label="Address"
        autoComplete="address"
        variant="standard"
      />
      <TextField
        style={textFieldStyles}
        {...register('billingCity', { required: true })}
        id="billingCity"
        label="City"
        autoComplete="city"
        variant="standard"
      />
      <FormControl style={stateSelectStyles}>
        <InputLabel id="demo-simple-select-label">State</InputLabel>
        <Select
          {...register('state', { required: true })}
          id="billingState"
          label="State"
          // onChange={handleStateSelectChange}
        >
          {getStates()}
        </Select>
      </FormControl>
      <TextField
        style={textFieldStyles}
        {...register('billingZip', { required: true })}
        id="billingzip"
        label="Zip"
        autoComplete="zip"
        variant="standard"
      />
      <Divider style={{ width: '100%' }} />
      <Button type="submit" variant="contained">
        Complete Payment
      </Button>
    </StyledForm>
  );
}
const stateSelectStyles = {
  flexGrow: '1',
  flexShrink: '1',
  minWidth: '5em',
};

const textFieldStyles = {
  flexGrow: '1',
  flexShrink: '1',
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  flex: 1 1 20rem;
  padding: 0.5rem;
  border: 2px solid #e3e5e8;
`;

const StyledPaymentDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100%;
`;
const StyledPaymentForm = styled.form`
  min-width: 200px;
`;
