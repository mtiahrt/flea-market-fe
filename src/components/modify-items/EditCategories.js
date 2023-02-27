import * as React from 'react';
import { Controller, useForm, useFormState } from 'react-hook-form';
import { useContext, useEffect, useState } from 'react';
import { UserProfileContext } from '../../contexts/UserContext';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import {
  ADD_CATEGORY,
  ADD_SUBCATEGORY,
  GET_CATEGORIES,
  GET_SUBCATEGORIES,
} from '../../queries/graphQL';
import styled from 'styled-components';
import { ReactComponent as PlusIcon } from '../../icons/plus.svg';
import { Button, InputLabel, MenuItem, Select } from '@mui/material';
import Typography from '@mui/material/Typography';
import { FormInputDropdown } from '../shared/FormInputDropdown';
export default function EditCategories() {
  const [toggleAddOptions, setToggleAddOptions] = useState(false);
  const [addCategory, setAddCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [addSubcategory, setAddSubcategory] = useState(false);
  const [categoryOptionSelected, setCategoryOptionSelected] = useState(false);
  const [getSubcategories, { loading, error, data }] =
    useLazyQuery(GET_SUBCATEGORIES);
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

  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      category: '',
      categoryId: '',
    },
  });

  const { dirtyFields } = useFormState({
    control,
  });

  const onError = () => {
    console.error('Error in form submission');
  };
  const handleClearForm = () => {
    setAddCategory(false);
    setToggleAddOptions(false);
    setAddSubcategory(false);
    setCategoryOptionSelected(false);
    reset();
  };
  const handleAddSubcategoryCategorySelectChange = (e) => {
    const categoryId = +e.target.value;
    if (categoryId) {
      getSubcategories({ variables: { categoryId } });
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

  useEffect(() => {
    if (data) {
      setSubcategories(
        data.category.subcategoriesList.map((x) => ({ name: x.name, id: x.id }))
      );
    }
  }, [data]);

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
          variables: {
            categoryId: data.categoryId.props.value,
            name: data.subcategory,
          },
        }).then(
          ({
            data: {
              createSubcategory: { subcategory },
            },
          }) => {
            setSubcategories([
              ...subcategories,
              { name: subcategory.name, id: subcategory.id },
            ]);
          }
        );
  };
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
          <Button
            disabled={dirtyFields.categoryId ? true : false}
            style={{ display: 'block' }}
            role="category-selection"
            onClick={() => setAddCategory(!addCategory)}
            href="#"
          >
            Add Category
          </Button>
          <Button
            disabled={dirtyFields.category ? true : false}
            style={{ display: 'block' }}
            role="subcategory-selection"
            onClick={() => setAddSubcategory(!addSubcategory)}
            href="#"
          >
            Add Subcategory
          </Button>
          <p>{dirtyFields.category}</p>
        </div>
      )}

      {addCategory && (
        <div role="add-category">
          <ul>
            {categories.map((category) => {
              return <li key={category.id}>{category.name}</li>;
            })}
          </ul>
          <input
            {...register('category')}
            placeholder="Add Category"
            role="category"
          />
        </div>
      )}
      {addSubcategory && (
        <div role="add-subcategory">
          <InputLabel id="quantity-select-label">Select Category</InputLabel>
          <FormInputDropdown
            name="categoryId"
            control={control}
            options={dataCategories.categoriesList.map((x) => ({
              roleName: 'add-subcategory-category-option',
              key: x.id,
              value: x.id,
              label: x.name,
            }))}
            changeHandler={handleAddSubcategoryCategorySelectChange}
            label="Select Category"
          />
          {categoryOptionSelected && (
            <>
              <ul>
                {subcategories.map((sub) => (
                  <li key={sub.id}>{sub.name}</li>
                ))}
              </ul>
              <input
                {...register('subcategory', { required: false })}
                role="subcategory"
              />
            </>
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
const StyledLink = styled.a`
  display: block;
  color: #1976d2;
  font-size: 1.4em;
  margin-bottom: 0.6em;
  :hover {
    color: #7fb0e2;
  }
`;
