import * as React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
} from '@mui/material';
import styled from 'styled-components';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {
  GET_CATEGORIES,
  GET_SUBCATEGORIES,
  ADD_SALE_ITEM,
  ADD_ITEM_IMAGE,
} from '../../queries/graphQL';
import PreviewImages from '../../SharedComponents/PreviewImages';
import { postImage, saveItemImage, saveInventory } from './Utilities';
import { useHistory } from 'react-router-dom';

export default function AddItem() {
  const [category, setCategory] = useState(-1);
  const [subcategory, setSubcategory] = useState(-1);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [addinventory, { data, loading, error }] = useMutation(ADD_SALE_ITEM);
  const [addItemImage, { imageData, imageLoading, imageError }] =
    useMutation(ADD_ITEM_IMAGE);
  const history = useHistory();
  const {
    loading: loadingCategories,
    error: errorCategories,
    data: dataCategories,
  } = useQuery(GET_CATEGORIES);

  const [
    getSubcategories,
    { loading: loadingSubs, error: errorSubs, data: dataSubs },
  ] = useLazyQuery(GET_SUBCATEGORIES);

  const onError = () => {
    console.error('Error in form submission');
  };
  const handleNewItemSubmit = (inventoryData, e) => {
    const promises = [];
    promises.push(handleAddinventory(inventoryData));
    const fileInputs = Array.from(e.target.elements).find(
      ({ name }) => name === 'imageFile'
    );
    [...fileInputs.files].map(async (file) => {
      promises.push(postImage(file));
    });
    Promise.all(promises).then((data) => {
      const newinventoryId = data.find(
        (x) => x.data?.createInventory.inventory.id
      )?.data.createInventory.inventory.id;
      const promises = handleAddItemImage(data, newinventoryId);
      Promise.all(promises).then((data) => {
        history.push({
          pathname: `/EditItem/${newinventoryId}`,
          state: {
            fileDataURL: data?.map(
              (item) => item.data.createItemImage.itemImage
            ),
          },
        });
      });
    });
  };

  const handleAddItemImage = (values, newinventoryId) => {
    if (values && newinventoryId) {
      return saveItemImage(newinventoryId, values, addItemImage);
    }
  };

  const handleAddinventory = (data) => {
    return saveInventory(null, data, addinventory);
  };

  const handleCategorySelectChange = (e) => {
    const categoryId = +e.target.value;
    setCategory(categoryId);
    getSubcategories({ variables: { categoryId: categoryId } });
  };

  const handleSubcategorySelectChange = (e) => {
    setSubcategory(+e.target.value);
  };
  console.log('Add Item is rendering...');
  if (loadingCategories) return 'Loading...';
  if (errorCategories) return `Error! ${errorCategories.message}`;

  return (
    <StyledForm onSubmit={handleSubmit(handleNewItemSubmit, onError)}>
      <Typography variant="h4" gutterBottom>
        New Sale Item
      </Typography>
      <TextField
        {...register('name', { required: true })}
        id="name"
        label="Name"
        autoComplete="name"
        variant="standard"
      />
      {errors.name?.type === 'required' && 'Name is required'}
      <TextField
        {...register('manufacturerName', { required: true })}
        id="manufacturerName"
        label="Manufacturer"
        autoComplete="manufacturer-name"
        variant="standard"
      />
      {errors.manufacturerName?.type === 'required' &&
        'Manufacturer name is required'}
      <InputLabel id="category-select-label">Category</InputLabel>
      <Select
        labelId="category-select-label"
        value={category}
        label="Category"
        onChange={handleCategorySelectChange}
      >
        {dataCategories.categoriesList.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
      {dataSubs?.category?.subcategoriesList && (
        <>
          <InputLabel id="subcategory-select-label">Subcategory</InputLabel>
          <Select
            {...register('subcategoryId', { required: true })}
            labelId="subcategory-select-label"
            value={subcategory}
            label="Subcategory"
            onChange={handleSubcategorySelectChange}
          >
            {dataSubs.category.subcategoriesList.map((sub) => (
              <MenuItem key={sub.id} value={sub.id}>
                {sub.name}
              </MenuItem>
            ))}
          </Select>
        </>
      )}
      <TextareaAutosize
        {...register('description')}
        id="description"
        label="Description"
        autoComplete="description"
        variant="standard"
        aria-label="minimum height"
        minRows={8}
        placeholder="Item Description"
      />
      <TextField
        {...register('price', { required: true })}
        type="number"
        id="price"
        label="Price"
        autoComplete="price"
        variant="standard"
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
      />
      {errors.price?.type === 'required' && 'Price is required'}

      <TextField
        {...register('quantity')}
        type="number"
        label="Quantity"
        id="quantity"
        variant="standard"
      />

      <PreviewImages />
      <Button type="submit" variant="contained">
        Submit
      </Button>
      <Button
        onClick={() => history.push(`/`)}
        style={{ backgroundColor: '#B8BDBB' }}
        variant="contained"
      >
        Cancel
      </Button>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0 20%;
`;
