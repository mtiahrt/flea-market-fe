import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import {
  Button,
  CircularProgress,
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
  GET_SUBCATEGORIES,
  ADD_ITEM_IMAGE,
  UPDATE_SALE_ITEM,
  GET_SALE_ITEM_AND_CATEGORIES,
  DELETE_INVENTORY_ITEM,
} from '../../queries/graphQL';
import PreviewImages from '../shared/PreviewImages';
import { useLocation } from 'react-router';
import {
  postImage,
  saveItemImage,
  saveInventory,
} from '../../utility-functions/images';
import { UserContext } from '../../contexts/UserContext';

const EditItem = () => {
  const { user } = useContext(UserContext);
  const history = useHistory();
  const { id } = useParams();
  const location = useLocation();
  const { fileDataURL, isInCart } = location.state ? location.state : [];
  const inventoryId = +id;
  const {
    loading: loadinginventory,
    error: errorinventory,
    data: datainventory,
  } = useQuery(GET_SALE_ITEM_AND_CATEGORIES, {
    variables: { saleId: inventoryId },
  });

  const [categoryId, setCategoryId] = useState(
    datainventory?.inventory.subcategory.category.id
  );
  const [subcategory, setSubcategory] = useState(
    datainventory?.inventory.subcategory.id
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [editinventory, { editedData, editedLoading, editedError }] =
    useMutation(UPDATE_SALE_ITEM);
  const [deleteInventory, { deletedData, deletedLoading, deletedError }] =
    useMutation(DELETE_INVENTORY_ITEM);
  const [addItemImage, { imageData, imageLoading, imageError }] =
    useMutation(ADD_ITEM_IMAGE);

  const [
    getSubcategories,
    {
      loading: loadingSubcategories,
      error: errorSubcategories,
      data: dataSubcategories,
    },
  ] = useLazyQuery(GET_SUBCATEGORIES);

  useEffect(() => {
    if (categoryId) {
      getSubcategories({ variables: { categoryId: categoryId } });
    }
  }, [categoryId]);

  const onError = () => {};

  const handleEditItemSubmit = async (inventoryData, e) => {
    const promises = [];
    promises.push(handleEditInventory(inventoryData));
    const fileInputs = Array.from(e.target.elements).find(
      ({ name }) => name === 'imageFile'
    );
    [...fileInputs.files].map(async (file) => {
      promises.push(postImage(file, user.accessToken));
    });

    Promise.all(promises)
      .then((data) => handleEditItemImage(data))
      .then((data) => console.log(data));
  };

  const handleEditItemImage = (values) => {
    if (values.length > 1) {
      return saveItemImage(inventoryId, values, addItemImage);
    }
  };

  const handleEditInventory = (data) => {
    return saveInventory(inventoryId, data, editinventory);
  };

  const handleCategorySelectChange = (e) => {
    const categoryId = e.target.value;
    setCategoryId(categoryId);
  };

  const handleSubcategoryOnChange = (e) => {
    setSubcategory(e.target.value);
  };

  const deleteInventoryItem = () => {
    deleteInventory({
      variables: { id: inventoryId },
    }).then(() => console.log('Item deleted successfully'));
    history.push(`/`);
  };

  console.log('EditItem component is Rendering...');
  if (
    loadinginventory ||
    loadingSubcategories ||
    editedLoading ||
    imageLoading
  ) {
    console.log('loading.......');
    return (
      <CircularProgress
        style={{
          position: 'fixed',
          top: '40%',
          left: '40%',
          padding: '50px',
          zIndex: 1,
        }}
        color="primary"
        size="10rem"
      />
    );
  }

  if (errorinventory) return `Error! ${errorinventory.message}`;

  return (
    <StyledForm onSubmit={handleSubmit(handleEditItemSubmit, onError)}>
      <Typography variant="h4" gutterBottom>
        Edit Sale Item
      </Typography>
      <TextField
        {...register('name', { required: true })}
        defaultValue={datainventory.inventory.name}
        id="name"
        label="Name"
        autoComplete="name"
        variant="standard"
      />
      {errors.name?.type === 'required' && 'Name is required'}
      <TextField
        {...register('manufacturerName', { required: true })}
        defaultValue={datainventory.inventory.manufacturerName}
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
        value={
          categoryId
            ? categoryId
            : datainventory.inventory.subcategory.category.id
        }
        label="Category"
        onChange={handleCategorySelectChange}
      >
        {datainventory.categoriesList.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
      <InputLabel id="subcategory-select-label">Subcategory</InputLabel>
      <Select
        {...register('subcategoryId', { required: true })}
        labelId="subcategory-select-label"
        value={
          subcategory ? subcategory : datainventory.inventory.subcategory.id
        }
        label="Subcategory"
        onChange={handleSubcategoryOnChange}
      >
        {dataSubcategories
          ? dataSubcategories.category.subcategoriesList.map((sub) => (
              <MenuItem key={sub.id} value={sub.id}>
                {sub.name}
              </MenuItem>
            ))
          : datainventory.inventory.subcategory.category.subcategoriesList?.map(
              (sub) => (
                <MenuItem key={sub.id} value={sub.id}>
                  {sub.name}
                </MenuItem>
              )
            )}
      </Select>
      <TextareaAutosize
        {...register('description')}
        defaultValue={datainventory.inventory.description}
        id="description"
        label="Description"
        autoComplete="description"
        variant="standard"
        aria-label="minimum height"
        minRows={8}
        placeholder="Item Description"
        style={{ width: '100%' }}
      />
      <TextField
        defaultValue={datainventory.inventory.price}
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
        defaultValue={datainventory.inventory.quantity}
        {...register('quantity')}
        type="number"
        label="Quantity"
        id="quantity"
        variant="standard"
      />
      <PreviewImages fileDataURL={fileDataURL} />
      <StyledButtonDiv>
        <Button type="submit" variant="contained">
          Save
        </Button>
        <Button
          onClick={() =>
            history.push(`/inventory/detailedItem/${inventoryId}`, {
              isInCart,
              inventoryId,
            })
          }
          style={{ backgroundColor: '#B8BDBB' }}
          variant="contained"
        >
          Cancel
        </Button>
        <Button
          onClick={deleteInventoryItem}
          type="submit"
          color="error"
          variant="contained"
        >
          Delete
        </Button>
      </StyledButtonDiv>
    </StyledForm>
  );
};
const StyledForm = styled.form`
  display: flex;
  background-color: var(--logo-fill-color);
  flex-direction: column;
  gap: 1rem;
  margin: 0 20%;
  margin: 2rem;
  padding: 2rem;
`;

const StyledButtonDiv = styled.div`
  display: flex;
  width: 100%;
  gap: 0.4rem;
  justify-content: space-evenly;

  button {
    width: 48%;
  }

  @media (max-width: 700px) {
    flex-direction: column;
    gap: 0.4rem;
    button {
      width: 100%;
    }
  }
`;

export default EditItem;
