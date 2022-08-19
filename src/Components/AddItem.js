import * as React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button, TextareaAutosize } from '@mui/material';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

export default function AddItem() {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState('');

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
        <Typography variant='h6' gutterBottom>New Item</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              {...register('name')}
              required
              id='name'
              label='Name'
              fullWidth
              autoComplete='name'
              variant='standard' />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              {...register('manufacturerName')}
              required
              id='manufacturerName'
              label='Manufacturer Name'
              fullWidth
              autoComplete='manufacturer-name'
              variant='standard'
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextareaAutosize
              {...register('description')}
              required
              id='description'
              label='Description'
              fullWidth
              autoComplete='description'
              variant='standard'
              aria-label='minimum height'
              minRows={8}
              placeholder='New Item Description'
              style={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              {...register('price')}
              required
              id='price'
              label='Price'
              fullWidth
              autoComplete='price'
              variant='standard'
            />
          </Grid>
        </Grid>
        <p>{data}</p>
        <Button type='submit' variant='contained'>Submit</Button>
        <Link to={`/`}><Button variant='contained'>Cancel</Button></Link>

      </form>
    </React.Fragment>
  );
}
