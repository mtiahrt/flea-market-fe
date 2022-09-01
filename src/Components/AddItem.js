import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button, TextareaAutosize } from '@mui/material';
import styled from 'styled-components';
import { gql, useMutation } from '@apollo/client';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

const ADD_SALE_ITEM = gql`
    mutation createSaleItem($name: String!, $description: String, $manufacturerName: String, $price: BigFloat){
        createSaleItem(
         input: { saleItem: 
          {name: $name
            description: $description
            manufacturerName: $manufacturerName
            price: $price
            subcategoryId: 7
          }}
        ) {
          saleItem {
            id
            name
            description
            manufacturerName
            subcategoryId
            price
          }
        }
    }`;

export default function AddItem() {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [addSaleItem, { data, loading, error }] = useMutation(ADD_SALE_ITEM);
  const handleMySubmit = data => {
    addSaleItem({
      variables:
        {
          name: data.name,
          description: data.description,
          manufacturerName: data.title,
          price: data.price
        }
    }).then().catch(reason => console.error(reason));
  };
  return (
    <StyledForm onSubmit={ handleSubmit((data) => handleMySubmit(data)) }>
      <Typography variant='h4' gutterBottom>New Item</Typography>
      <Grid
        container
        spacing={6}>
        <Grid item xs={12}>
          <TextField
            {...register('name', {required: true})}
            id='name'
            label='Name'
            fullWidth
            autoComplete='name'
            variant='standard' />
          {errors.name?.type === 'required' && "Name is required"}
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register('manufacturerName', {required: true})}
            id='manufacturerName'
            label='Manufacturer Name'
            fullWidth
            autoComplete='manufacturer-name'
            variant='standard'
          />
          {errors.manufacturerName?.type === 'required' && "Manufacturer name is required"}
        </Grid>
        <Grid item xs={12}>
          <TextareaAutosize
            {...register('description')}
            id='description'
            label='Description'
            autoComplete='description'
            variant='standard'
            aria-label='minimum height'
            minRows={8}
            placeholder='Item Description'
            style={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register('price', {required: true})}
            id='price'
            label='Price'
            fullWidth
            autoComplete='price'
            variant='standard'
          />
          {errors.price?.type === 'required' && "Price is required"}
        </Grid>
      </Grid>


      <Grid style={{marginTop: '5%'}} container spacing={4}>
        <Grid item xs={4}>
          <Button type='submit' variant='contained'>Submit</Button>
        </Grid>
        <Grid item xs={4}>
          <Link to={`/`}><Button variant='contained'>Cancel</Button></Link>
        </Grid>
      </Grid>


    </StyledForm>
  );
}

const StyledForm = styled.form`
  margin: 0 20%;
`;
