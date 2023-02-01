import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserProfileContext } from '../../contexts/UserContext';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_CATEGORIES, GET_SUBCATEGORIES } from '../../queries/graphQL';
import styled from 'styled-components';
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

function EditCategories() {
  const [toggleAddOptions, setToggleAddOptions] = useState(false);
  const [addCategory, setAddCategory] = useState(false);
  const { userProfile } = useContext(UserProfileContext);

  const {
    loading: loadingCategories,
    error: errorCategories,
    data: dataCategories,
  } = useQuery(GET_CATEGORIES);
  // const [
  //   getSubcategories,
  //   { loading: loadingSubs, error: errorSubs, data: dataSubs },
  // ] = useLazyQuery(GET_SUBCATEGORIES);
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
  const handleAddCategoryClick = () => {};
  const handleAddSubcategoryClick = () => {};
  const handleCategorySelectChange = (e) => {
    const categoryId = +e.target.value;
    // setCategory(categoryId);
  };

  if (loadingCategories) return <p>Loading...</p>;
  if (errorCategories) return <p>{errorCategories.message}</p>;
  return (
    <StyledForm onSubmit={handleSubmit(handleNewItemSubmit, onError)}>
      <Typography variant="h4" gutterBottom>
        Edit Categories and Subcategories
      </Typography>
      <InputLabel id="category-select-label">Add</InputLabel>
      <StyledIconButton>
        <PlusIcon
          role="categories-plus-icon"
          onClick={() => setToggleAddOptions(!toggleAddOptions)}
        />
      </StyledIconButton>
      {toggleAddOptions && (
        <div role="dropdown-options">
          <option onClick={handleAddCategoryClick}>Add Category</option>
          <option onClick={handleAddSubcategoryClick}>Add Subcategory</option>
        </div>
      )}

      {/*{addCategory &&*/}
      {/*  dataCategories.categoriesList.map((category) => {*/}
      {/*    <>*/}
      {/*      <div role="categories-list">{category}</div>*/}
      {/*      <input role="category" />*/}
      {/*    </>;*/}
      {/*  })}*/}
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
        onClick={() => {}}
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
