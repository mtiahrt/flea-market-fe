import * as React from 'react';
import { useState, useEffect } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { Button, InputAdornment, InputLabel, MenuItem, Select, TextareaAutosize } from '@mui/material';
import styled from 'styled-components';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import {
  GET_SUBCATEGORIES,
  ADD_ITEM_IMAGE,
  UPDATE_SALE_ITEM,
  GET_SALE_ITEM_AND_CATEGORIES
} from '../../queries/graphQL';
import PreviewImages from '../../SharedComponents/PreviewImages';
import { useLocation } from 'react-router';
import { saveImages, saveItemImage, saveSaleItem } from './Utilities';

const EditItem = () => {
  // const { isDirty } = useFormState();
  const { id } = useParams();
  const location = useLocation();
  const { fileDataURL } = location.state;
  const saleId = parseInt(id);
  const {
    loading: loadingSaleItem, error: errorSaleItem, data: dataSaleItem
  } = useQuery(GET_SALE_ITEM_AND_CATEGORIES, { variables: { saleId } });

  const [categoryId, setCategoryId] = useState(dataSaleItem?.saleItem.subcategory.category.id);
  const [subcategory, setSubcategory] = useState(dataSaleItem?.saleItem.subcategory.id);
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [editSaleItem, { editedData, editedLoading, editedError }] = useMutation(UPDATE_SALE_ITEM);
  const [addItemImage, { imageData, imageLoading, imageError }] = useMutation(ADD_ITEM_IMAGE);
  const [getSubcategories, {
    loading: loadingSubcategories, error: errorSubcategories, data: dataSubcategories
  }] = useLazyQuery(GET_SUBCATEGORIES);

  useEffect(() => {
    if (categoryId) {
      getSubcategories({ variables: { categoryId: categoryId } });
    }
  }, [categoryId]);

  const onError = () => {
  };

  const handleEditItemSubmit = (saleItemData, e) => {
    const imagePromises = saveImages(e);
     // if (isDirty) {
      imagePromises.push(handleEditSaleItem(saleItemData));
    // }
    Promise.all(imagePromises).then(data => handleEditItemImage(data))
      .then(data => console.log(data));
  };

  const handleEditItemImage = (values) => {
    if (values.length > 1) {
      return saveItemImage(saleId, values, addItemImage);
    }
  };

  const handleEditSaleItem = (data) => {
    return saveSaleItem(saleId, data, editSaleItem);
  };

  const handleCategorySelectChange = e => {
    const categoryId = e.target.value;
    setCategoryId(categoryId);
  };

  const handleSubcategoryOnChange = e => {
    setSubcategory(e.target.value);
  };

  console.log('EditItem component is Rendering...');
  if (loadingSaleItem) return 'Loading...';
  if (errorSaleItem) return `Error! ${errorSaleItem.message}`;

  return (
    <StyledForm onSubmit={handleSubmit(handleEditItemSubmit, onError)}>
      <Typography variant='h4' gutterBottom>Edit Sale Item</Typography>
      <Grid
        container
        spacing={3}>
        <Grid item xs={12}>
          <TextField
            {...register('name', { required: true })}
            defaultValue={dataSaleItem.saleItem.name}
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
            defaultValue={dataSaleItem.saleItem.manufacturerName}
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
            value={categoryId ? categoryId : dataSaleItem.saleItem.subcategory.category.id
            }
            label='Category'
            onChange={handleCategorySelectChange}
          >
            {dataSaleItem.categoriesList.map(category => (
              <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>))}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <InputLabel id='subcategory-select-label'>Subcategory</InputLabel>
          <Select
            {...register('subcategoryId', { required: true })}
            fullWidth
            labelId='subcategory-select-label'
            value={subcategory ? subcategory : dataSaleItem.saleItem.subcategory.id}
            label='Subcategory'
            onChange={handleSubcategoryOnChange}
          >
            {dataSubcategories
              ? dataSubcategories.category.subcategoriesList.map(sub => (
                <MenuItem key={sub.id} value={sub.id}>{sub.name}</MenuItem>))
              : dataSaleItem.saleItem.subcategory.category.subcategoriesList?.map(sub => (
                <MenuItem key={sub.id} value={sub.id}>{sub.name}</MenuItem>))
            }
          </Select>
        </Grid>
        <Grid item xs={12}>
          <TextareaAutosize
            {...register('description')}
            defaultValue={dataSaleItem.saleItem.description}
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
            defaultValue={dataSaleItem.saleItem.price}
            {...register('price', { required: true })}
            type='number'
            id='price'
            label='Price'
            fullWidth
            autoComplete='price'
            variant='standard'
            InputProps={{
              startAdornment: <InputAdornment position='start'>$</InputAdornment>
            }}
          />
          {errors.price?.type === 'required' && 'Price is required'}
        </Grid>
      </Grid>
      <Grid item style={{ marginTop: '5%' }} xs={12}>
        <PreviewImages fileDataURL={fileDataURL} />
      </Grid>
      <Grid style={{ marginTop: '5%' }} container spacing={4}>
        <Grid item xs={4}>
          <Button type='submit' variant='contained'>Submit</Button>
        </Grid>
        <Grid item xs={4}>
          <Link to={`/DetailedItem/${saleId}`}><Button variant='contained'>Cancel</Button></Link>
        </Grid>
      </Grid>
    </StyledForm>
  );
};
const StyledForm = styled.form`
  margin: 0 20%;
`;
export default EditItem;