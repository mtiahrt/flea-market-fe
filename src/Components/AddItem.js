import * as React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button, InputLabel, MenuItem, Select, TextareaAutosize } from '@mui/material';
import styled from 'styled-components';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { GET_CATEGORIES, GET_SUBCATEGORIES, ADD_SALE_ITEM, ADD_ITEM_IMAGE } from '../queries/graphQL';
import PreviewImages from '../SharedComponents/PreviewImages';

export default function AddItem() {
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [addSaleItem, { data, loading, error }] = useMutation(ADD_SALE_ITEM);
  const [addItemImage, { imageData, imageLoading, imageError }] = useMutation(ADD_ITEM_IMAGE);

  const {
    loading: loadingCategories, error: errorCategories, data: dataCategories
  } = useQuery(GET_CATEGORIES);

  const [getSubcategories, {
    loading: loadingSubs, error: errorSubs, data: dataSubs
  }] = useLazyQuery(GET_SUBCATEGORIES);

  const handleNewItemSubmit = (saleItemData) => {
    // eslint-disable-next-line no-restricted-globals
    const fileInputs = Array.from(event.target.elements).find(({ name }) => name === 'imageFile');
    const promises = [...fileInputs.files].map(file => {
      const formData = new FormData();
      formData.append('upload_preset', 'my-uploads');
      formData.append('file', file);
      return fetch('https://api.cloudinary.com/v1_1/flea-market/image/upload', {
        method: 'POST', body: formData
      }).then(response => response.json());
    });
    promises.push(handleAddSaleItem(saleItemData));
    Promise.all(promises).then(data => handleAddItemImage(data))
      .then(data => console.log(data));
  };

  const handleAddItemImage = (values) => {
    if (values.length > 1) {
      //get saleId from last element
      const saleId = values[values.length - 1].data.createSaleItem.saleItem.id;
      const imageURLs = values.filter(x => x.secure_url);
      return imageURLs.map(item => {
        return addItemImage({
          variables: {
            saleId: saleId,
            imageURL: item.secure_url
          }
        }).then(data => data)
          .catch(reason => console.error(reason));
      });
    }
  };

  const handleAddSaleItem = ({
                               name, manufacturerName, subcategoryId, description, price
                             }) => {
    return addSaleItem({
      variables: {
        name: name,
        manufacturerName: manufacturerName,
        subcategoryId: subcategoryId,
        description: description,
        price: price
      }
    }).then(data => data)
      .catch(reason => console.error(reason));
  };
  const handleCategorySelectChange = e => {
    const categoryId = e.target.value;
    setCategory(categoryId);
    getSubcategories({ variables: { categoryId: categoryId } });
  };

  const handleSubcategorySelectChange = e => {
    setSubcategory(e.target.value);
  };
  console.log('Add Item is rendering...');
  if (loadingCategories) return 'Loading...';
  if (errorCategories) return `Error! ${errorCategories.message}`;
  return (<StyledForm onSubmit={handleSubmit((data) => handleNewItemSubmit(data))}>
    <Typography variant='h4' gutterBottom>New Sale Item</Typography>
    <Grid
      container
      spacing={3}>
      <Grid item xs={12}>
        <TextField
          {...register('name', { required: true })}
          id='name'
          label='Name'
          fullWidth
          autoComplete='name'
          variant='standard' />
        {errors.name?.type === 'required' && 'Name is required'}
      </Grid>
      <Grid item xs={12}>
        <TextField
          {...register('manufacturerName', { required: true })}
          id='manufacturerName'
          label='Manufacturer Name'
          fullWidth
          autoComplete='manufacturer-name'
          variant='standard'
        />
        {errors.manufacturerName?.type === 'required' && 'Manufacturer name is required'}
      </Grid>
      <Grid item xs={12}>
        <InputLabel id='category-select-label'>Category</InputLabel>
        <Select
          fullWidth
          labelId='category-select-label'
          value={category}
          label='Category'
          onChange={handleCategorySelectChange}
        >
          {dataCategories.categoriesList.map((category) => (
            <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>))}
        </Select>
      </Grid>
      {dataSubs?.category?.subcategoriesList && <Grid item xs={12}>
        <InputLabel id='subcategory-select-label'>Subcategory</InputLabel>
        <Select
          {...register('subcategoryId', { required: true })}
          fullWidth
          labelId='subcategory-select-label'
          value={subcategory}
          label='Subcategory'
          onChange={handleSubcategorySelectChange}
        >
          {dataSubs.category.subcategoriesList.map(sub => (
            <MenuItem key={sub.id} value={sub.id}>{sub.name}</MenuItem>))}
        </Select>
      </Grid>}
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
          {...register('price', { required: true })}
          type='number'
          id='price'
          label='Price'
          fullWidth
          autoComplete='price'
          variant='standard'
        />
        {errors.price?.type === 'required' && 'Price is required'}
      </Grid>
    </Grid>
    <Grid item style={{ marginTop: '5%' }} xs={12}>
      <PreviewImages />
    </Grid>
    <Grid style={{ marginTop: '5%' }} container spacing={4}>
      <Grid item xs={4}>
        <Button type='submit' variant='contained'>Submit</Button>
      </Grid>
      <Grid item xs={4}>
        <Link to={`/`}><Button variant='contained'>Cancel</Button></Link>
      </Grid>
    </Grid>
  </StyledForm>);
}

const StyledForm = styled.form`
  margin: 0 20%;
`;
