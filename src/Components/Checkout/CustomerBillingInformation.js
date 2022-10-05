import * as React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { Button, InputLabel, Select, Checkbox, MenuItem } from '@mui/material';


export default function CustomerBillingInformation() {
  const { register, formState: { errors }, handleSubmit } = useForm();

  const handlePaymentSubmit = (paymentData, e) => {
    console.log('payment submitted....', paymentData)
  };
  const onError = () => {
    console.error('Error in form submission');
  };

  function handleStateSelectChange() {

  }
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  return (
    <StyledForm onSubmit={handleSubmit(handlePaymentSubmit, onError)}>
      <Typography variant='h4' gutterBottom>Customer Information</Typography>
      <TextField
        {...register('firstName', { required: true })}
        id='firstName'
        label='First Name'
        autoComplete='first-name'
        variant='standard' />
      {errors.name?.type === 'required' && 'Name is required'}
      <TextField
        {...register('lastName', { required: true })}
        id='lastName'
        label='Last Name'
        autoComplete='last-name'
        variant='standard'
      />
      <TextField
        {...register('email', { required: true })}
        id='email'
        label='Email'
        autoComplete='email'
        variant='standard'
      />
      <TextField
        {...register('address', { required: true })}
        id='address'
        label='Address'
        autoComplete='address'
        variant='standard'
      />
      <TextField
        {...register('city', { required: true })}
        id='city'
        label='City'
        autoComplete='city'
        variant='standard'
      />
      <InputLabel id='state-select-label'>State</InputLabel>
      <Select
        {...register('state', { required: true })}
        labelId='statre-select-label'
        label='State'
        onChange={handleStateSelectChange}
      >
        <MenuItem value="CO">CO</MenuItem>
        {/*{dataSubs.category.subcategoriesList.map(sub => (*/}
        {/*  <MenuItem key={sub.id} value={sub.id}>{sub.name}</MenuItem>))*/}
        {/*}*/}
      </Select>
      <TextField
        {...register('zip', { required: true })}
        id='zip'
        label='Zip'
        autoComplete='zip'
        variant='standard'
      />
      <Typography variant='h4' gutterBottom>Payment Info</Typography>
      <p>Credit Card</p>
      {/*Strip stuff here*/}
      <label>Same as Shipping address</label>
      <Checkbox {...label} defaultChecked />
      <Typography variant='h4' gutterBottom>Billing Address</Typography>
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
        <MenuItem value="CO">CO</MenuItem>
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
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 0 10%;
`;