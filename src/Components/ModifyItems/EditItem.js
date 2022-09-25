import * as React from 'react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize
} from '@mui/material';
import styled from 'styled-components';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import Typography from '@mui/material/Typography';
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
  const history = useHistory();
  const { id } = useParams();
  const location = useLocation();
  const { fileDataURL } = location.state
    ?
    location.state
    : [];
  const saleId = +id;
  const {
    loading: loadingSaleItem, error: errorSaleItem, data: dataSaleItem
  } = useQuery(GET_SALE_ITEM_AND_CATEGORIES, { variables: { saleId } });

  console.log('filedataURL is:', fileDataURL)
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
    imagePromises.push(handleEditSaleItem(saleItemData));
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
  if (loadingSaleItem || loadingSubcategories || editedLoading || imageLoading) {
    console.log('loading.......');
    return <CircularProgress
      style={{ display: 'flex' }}
      color='info'
      size='sm'
      value={10} />
  }

  if (errorSaleItem) return `Error! ${errorSaleItem.message}`;

  return (
      <StyledForm onSubmit={handleSubmit(handleEditItemSubmit, onError)}>
        <Typography variant='h4' gutterBottom>Edit Sale Item</Typography>
        <TextField
          {...register('name', { required: true })}
          defaultValue={dataSaleItem.saleItem.name}
          id='name'
          label='Name'
          autoComplete='name'
          variant='standard' />
        {errors.name?.type === 'required' && 'Name is required'}
        <TextField
          {...register('manufacturerName', { required: true })}
          defaultValue={dataSaleItem.saleItem.manufacturerName}
          id='manufacturerName'
          label='Manufacturer'
          autoComplete='manufacturer-name'
          variant='standard'
        />
        {errors.manufacturerName?.type === 'required' && 'Manufacturer name is required'}
        <InputLabel id='category-select-label'>Category</InputLabel>
        <Select
          labelId='category-select-label'
          value={categoryId ? categoryId : dataSaleItem.saleItem.subcategory.category.id
          }
          label='Category'
          onChange={handleCategorySelectChange}
        >
          {dataSaleItem.categoriesList.map(category => (
            <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>))}
        </Select>
        <InputLabel id='subcategory-select-label'>Subcategory</InputLabel>
        <Select
          {...register('subcategoryId', { required: true })}
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
        <PreviewImages fileDataURL={fileDataURL} />
        <Button type='submit' variant='contained'>Submit</Button>
        <Button onClick={() => history.push(`/DetailedItem/${saleId}`)} style={{ backgroundColor: '#B8BDBB' }}
                variant='contained'>Cancel</Button>
      </StyledForm>
  );
};
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0 20%;
`;
export default EditItem;