import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserProfileContext } from '../../contexts/UserContext';
import { useQuery, useMutation } from '@apollo/client';
import {
  ADD_CATEGORY,
  ADD_SUBCATEGORY,
  GET_CATEGORIES,
} from '../../queries/graphQL';
import styled from 'styled-components';
import { ReactComponent as PlusIcon } from '../../icons/plus.svg';

import { Button, InputLabel, MenuItem, Select } from '@mui/material';
import * as React from 'react';
import Typography from '@mui/material/Typography';

function EditCategories() {
  const [toggleAddOptions, setToggleAddOptions] = useState(false);
  const [addCategory, setAddCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const [addSubcategory, setAddSubcategory] = useState(false);
  const { userProfile } = useContext(UserProfileContext);
  const [categoryOptionSelected, setCategoryOptionSelected] = useState(false);
  const [
    insertCategory,
    { dataAddCategory, loadingAddCategory, errorAddCategory },
  ] = useMutation(ADD_CATEGORY);

  const [
    insertSubcategory,
    { dataAddSubcategory, loadingAddSubcategory, errorAddSubcategory },
  ] = useMutation(ADD_SUBCATEGORY);

  const {
    loading: loadingCategories,
    error: errorCategories,
    data: dataCategories,
  } = useQuery(GET_CATEGORIES);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onError = () => {
    console.error('Error in form submission');
  };
  const handleNewItemSubmit = (data) => {
    addCategory
      ? insertCategory({ variables: { name: data.category } }).then(
          ({
            data: {
              createCategory: { category },
            },
          }) => {
            setCategories([
              ...categories,
              {
                id: category.id,
                name: category.name,
              },
            ]);
          }
        )
      : insertSubcategory({
          variables: { categoryId: data.categoryId, name: data.subcategory },
        }).then((data) => data);
  };
  const handleClearForm = () => {
    setAddCategory(false);
    setToggleAddOptions(false);
    setAddSubcategory(false);
    setCategoryOptionSelected(false);
  };
  const handleAddSubcategoryCategorySelectChange = (e) => {
    const categoryId = +e.target.value;
    if (categoryId) {
      setCategoryOptionSelected(true);
    }
  };
  useEffect(() => {
    if (dataCategories?.categoriesList) {
      setCategories(
        dataCategories.categoriesList.map((category) => ({
          id: category.id,
          name: category.name,
        }))
      );
    }
  }, [dataCategories]);
  if (loadingCategories) return <p>Loading...</p>;
  if (errorCategories) return <p>{errorCategories.message}</p>;
  return (
    <StyledForm onSubmit={handleSubmit(handleNewItemSubmit, onError)}>
      <Typography variant="h4" gutterBottom>
        Edit Categories and Subcategories
      </Typography>
      <StyledIconButton>
        <PlusIcon
          role="plus-icon"
          onClick={() => setToggleAddOptions(!toggleAddOptions)}
        />
      </StyledIconButton>
      {toggleAddOptions && (
        <div role="dropdown-options">
          <option
            role="category-selection"
            data-testid="category-selection"
            onClick={() => setAddCategory(!addCategory)}
          >
            Add Category
          </option>
          <option
            role="subcategory-selection"
            data-testid="subcategory-selection"
            onClick={() => setAddSubcategory(!addSubcategory)}
          >
            Add Subcategory
          </option>
        </div>
      )}
      {addCategory && (
        <div role="add-category">
          {categories.map((category) => {
            return <h4 key={category.id}>{category.name}</h4>;
          })}
          <input
            {...register('category', { required: false })}
            role="category"
          />
        </div>
      )}
      {addSubcategory && (
        <div role="add-subcategory">
          <InputLabel id="quantity-select-label">Select Category</InputLabel>
          <Select
            {...register('categoryId', { required: false })}
            labelId="category-select-label"
            label="Category"
            onChange={handleAddSubcategoryCategorySelectChange}
          >
            {dataCategories.categoriesList.map((category) => (
              <MenuItem
                role="add-subcategory-category-option"
                key={category.id}
                value={category.id}
              >
                {category.name}
              </MenuItem>
            ))}
          </Select>
          {categoryOptionSelected && (
            <input
              {...register('subcategory', { required: false })}
              data-testid="subcategory"
            />
          )}
        </div>
      )}

      <Button type="submit" variant="contained">
        Submit
      </Button>
      <Button
        onClick={handleClearForm}
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
