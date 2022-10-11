import * as React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { Button, InputLabel, Select, Checkbox, MenuItem } from '@mui/material';
import axios from 'axios';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';


export default function CustomerBillingInformation() {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const stripe = useStripe();
  const elements = useElements();
  const handlePaymentSubmit = async (paymentData, e) => {
    const clientSecret = await axios.post('https://uvvhidm2fnw6kbmbivkx35tlc40ikmmv.lambda-url.us-east-1.on.aws/', { amount: 1000 }, {
      headers: {
        'content-type': 'text/plain'
      }
    }).then(response => response.data.paymentIntent.client_secret);
    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Marky Mark'
        }
      }
    });
    if (paymentResult.error) {
      alert(paymentResult.error);
      return;
    }
    if (paymentResult.paymentIntent.status === 'succeeded') {
      alert('payment is good!!!');
    }
  };
  const onError = (e) => {
    console.error('Error in form submission', e.state);
  };

  function handleStateSelectChange() {

  }

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  return (
    <>
      <Typography variant='h4' gutterBottom>Customer Information</Typography>
      <StyledForm onSubmit={handleSubmit(handlePaymentSubmit, onError)}>
        <TextField style={{flexGrow: '1', flexShrink: '1'}}
          {...register('firstName', { required: true })}
          id='firstName'
          label='First Name'
          autoComplete='first-name'
          variant='standard' />
        {errors.name?.type === 'required' && 'Name is required'}
        <TextField style={{flexGrow: '1', flexShrink: '1'}}
          {...register('lastName', { required: true })}
          id='lastName'
          label='Last Name'
          autoComplete='last-name'
          variant='standard'
        />
        <TextField style={{flexGrow: '1', flexShrink: '1'}}
          {...register('email', { required: true })}
          id='email'
          label='Email'
          autoComplete='email'
          variant='standard'
        />
        <TextField style={{flexGrow: '3', flexShrink: '1', width: '100%'}}
          {...register('address', { required: true })}
          id='address'
          label='Address'
          autoComplete='address'
          variant='standard'
        />
        <TextField style={{flexGrow: '1', flexShrink: '1'}}
          {...register('city', { required: true })}
          id='city'
          label='City'
          autoComplete='city'
          variant='standard'
        />
        {/*<InputLabel id='state-select-label'>State</InputLabel>*/}
        <Select style={{flexGrow: '1', flexShrink: '1'}}
          {...register('state', { required: true })}
          labelId='state-select-label'
          label='State'
          onChange={handleStateSelectChange}
        >

          <MenuItem value='CO'>CO</MenuItem>
          {/*{dataSubs.category.subcategoriesList.map(sub => (*/}
          {/*  <MenuItem key={sub.id} value={sub.id}>{sub.name}</MenuItem>))*/}
          {/*}*/}
        </Select>

        <TextField style={{flexGrow: '1', flexShrink: '1'}}
          {...register('zip', { required: true })}
          id='zip'
          label='Zip'
          autoComplete='zip'
          variant='standard'
        />
        <StyledPaymentDiv>
          <StyledPaymentForm>
            <h2>Credit Card</h2>
            <CardElement />
            <Button>Pay now</Button>
          </StyledPaymentForm>
        </StyledPaymentDiv>
        <Typography variant='h4' gutterBottom>Billing Address</Typography>
          <label>Same as Shipping address</label>
          <Checkbox {...label} defaultChecked />

          <TextField
            {...register('billingFirstName', { required: true })}
            id='billingFirstName'
            label='First Name'
            autoComplete='first-name'
            variant='standard' />
          {errors.name?.type === 'required' && 'Billing name is required'}
          <TextField
            {...register('billingLastName', { required: true })}
            id='billingLastName'
            label='Last Name'
            autoComplete='last-name'
            variant='standard'
          />
          <TextField
            {...register('billingAddress', { required: true })}
            id='billingAddress'
            label='Address'
            autoComplete='address'
            variant='standard'
          />
          <TextField
            {...register('billingCity', { required: true })}
            id='billingCity'
            label='City'
            autoComplete='city'
            variant='standard'
          />
          <InputLabel id='state-select-label'>State</InputLabel>
          <Select
            {...register('billingState', { required: true })}
            labelId='billing-state-select-label'
            label='State'
            onChange={handleStateSelectChange}
          >
            <MenuItem value='CO'>CO</MenuItem>
            {/*{dataSubs.category.subcategoriesList.map(sub => (*/}
            {/*  <MenuItem key={sub.id} value={sub.id}>{sub.name}</MenuItem>))*/}
            {/*}*/}
          </Select>
          <TextField
            {...register('billingZip', { required: true })}
            id='billingzip'
            label='Zip'
            autoComplete='zip'
            variant='standard'
          />
          <Button type='submit' variant='contained'>Complete Payment</Button>
      </StyledForm>
    </>
  );
}

const StyledForm = styled.form`
  border: solid #32a1ce;
  padding: 5px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 55%;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 0 5%;
`;


const StyledPaymentDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;
const StyledPaymentForm = styled.form`
  min-width: 500px;
`;