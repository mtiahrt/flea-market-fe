import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserProfileContext } from '../../contexts/UserContext';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_CATEGORIES, GET_SUBCATEGORIES } from '../../queries/graphQL';
import styled from 'styled-components';
import ContentCut from '@mui/icons-material/ContentCut';
import AddOutlined from '@mui/icons-material/AddOutlined';
import { ReactComponent as PlusIcon } from '../../icons/plus.svg';

import {
  Button,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
} from '@mui/material';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Link, useHistory } from 'react-router-dom';

function EditCategories(props) {
  const [category, setCategory] = useState(-1);
  const [subcategory, setSubcategory] = useState(-1);
  const { userProfile } = useContext(UserProfileContext);
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
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onError = () => {
    console.error('Error in form submission');
  };
  const handleNewItemSubmit = (data, e) => {
    console.log('submit happened', data);
  };
  const handleCategorySelectChange = (e) => {
    const categoryId = +e.target.value;
    setCategory(categoryId);
    getSubcategories({ variables: { categoryId: categoryId } });
  };

  const getPlusOption = () => {
    return (
      <MenuItem>
        <ListItemIcon>
          <AddOutlined />
        </ListItemIcon>
        <ListItemText primary="New" />
      </MenuItem>
    );
  };

  const handleSubcategorySelectChange = (e) => {
    setSubcategory(+e.target.value);
  };
  if (loadingCategories) return 'Loading...';
  if (errorCategories) return `Error! ${errorCategories.message}`;

  return (
    <StyledForm onSubmit={handleSubmit(handleNewItemSubmit, onError)}>
      <Typography variant="h4" gutterBottom>
        Edit Categories
      </Typography>
      <InputLabel id="category-select-label">Add Category</InputLabel>
      <StyledIconButton>
        <PlusIcon />
      </StyledIconButton>

      <InputLabel id="category-select-label">Add Subcategory</InputLabel>
      <StyledIconButton>
        <PlusIcon />
      </StyledIconButton>
      {/*<Select*/}
      {/*  labelId="category-select-label"*/}
      {/*  value={category}*/}
      {/*  label="Category"*/}
      {/*  onChange={handleCategorySelectChange}*/}
      {/*>*/}
      {/*  {getPlusOption()}*/}
      {/*  {dataCategories.categoriesList.map((category) => (*/}
      {/*    <MenuItem key={category.id} value={category.id}>*/}
      {/*      {category.name}*/}
      {/*    </MenuItem>*/}
      {/*  ))}*/}
      {/*</Select>*/}
      {/*{dataSubs?.category?.subcategoriesList && (*/}
      {/*  <>*/}
      {/*    <InputLabel id="subcategory-select-label">Subcategory</InputLabel>*/}
      {/*    <Select*/}
      {/*      {...register('subcategoryId', { required: true })}*/}
      {/*      labelId="subcategory-select-label"*/}
      {/*      value={subcategory}*/}
      {/*      label="Subcategory"*/}
      {/*      onChange={handleSubcategorySelectChange}*/}
      {/*    >*/}
      {/*      {getPlusOption()}*/}
      {/*      {dataSubs.category.subcategoriesList.map((sub) => (*/}
      {/*        <MenuItem key={sub.id} value={sub.id}>*/}
      {/*          {sub.name}*/}
      {/*        </MenuItem>*/}
      {/*      ))}*/}
      {/*    </Select>*/}
      {/*  </>*/}

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

const StyledIconButton = styled.a`
   {
    --button-size: calc(var(--nav-size) * 0.5);
    width: var(--button-size);
    height: var(--button-size);
    background-color: #b9bcc0;
    border-radius: 50%;
    padding: 5px;
    margin: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: filter 300ms;
    :hover {
      filter: brightness(1.2);
    }
  }
`;
export default EditCategories;
