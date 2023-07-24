import * as React from 'react';
import { useForm, useFormState, Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import {
  ADD_CATEGORY,
  ADD_SUBCATEGORY,
  GET_CATEGORIES,
  GET_SUBCATEGORIES,
} from '../../queries/graphQL';
import styled from 'styled-components';
import { ReactComponent as PlusIcon } from '../../icons/plus.svg';
import { ReactComponent as MinusIcon } from '../../icons/minus.svg';
import { Button } from '@mui/material';
import { FormInputDropdown } from '../shared/FormInputDropdown';
import TextField from '@mui/material/TextField';
import NavItem from '../../nav/NavItem';
import { useSnackbar } from '../../hooks/useSnackbar';
import { Snackbar } from '../shared/Snackbar';
import Typography from '@mui/material/Typography';
export default function EditCategories() {
  const { isActive, message, openSnackBar } = useSnackbar();
  const [toggleAddOptions, setToggleAddOptions] = useState(false);
  const [addCategory, setAddCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const [addSubcategory, setAddSubcategory] = useState(false);
  const [subcategories, setSubcategories] = useState([]);
  const [categoryOptionSelected, setCategoryOptionSelected] = useState(false);
  const [getSubcategories, { loading, error, data }] = useLazyQuery(
    GET_SUBCATEGORIES,
    { fetchPolicy: 'network-only' }
  );
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
  const StyledIconButton = styled.a`
     {
      display: ${addCategory || addSubcategory ? 'none' : 'flex'};
      --button-size: calc(var(--nav-size) * 0.5);
      fill: var(--logo-fill-color);
      width: var(--button-size);
      height: var(--button-size);
      background-color: var(--text-color-header);
      border-radius: 50%;
      padding: 5px;
      margin: 2px;
      align-items: center;
      justify-content: center;
      :hover {
        cursor: pointer;
      }
    }
  `;

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
    try {
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
      openSnackBar('Category item was saved successfully');
    } catch (e) {
      openSnackBar('Something went wrong.');
    }
  };
  if (loadingCategories) return <p>Loading...</p>;
  if (errorCategories) return <p>{errorCategories.message}</p>;

  return (
    <StyledForm onSubmit={handleSubmit(handleNewItemSubmit, onError)}>
      <Typography variant="h4" gutterBottom>
        Add Categories and Subcategories
      </Typography>
      <NavItem
        style={{ listStyle: 'none' }}
        isDropdown={true}
        clickHandler={() => setToggleAddOptions(!toggleAddOptions)}
        icon={<PlusIcon name="plus" role="plus-icon" />}
      ></NavItem>
      <StyledIconButton style={{ display: 'none' }}>
        <MinusIcon role="minus-icon" />
      </StyledIconButton>
      {toggleAddOptions && (
        <div role="dropdown-options">
          {!addSubcategory && (
            <Button
              color="secondary"
              disabled={addCategory}
              style={{ display: 'block' }}
              role="category-selection"
              onClick={() => setAddCategory(!addCategory)}
              href="#"
            >
              Add Category
            </Button>
          )}
          {!addCategory && (
            <Button
              color="secondary"
              disabled={addSubcategory}
              style={{ display: 'block' }}
              role="subcategory-selection"
              onClick={() => setAddSubcategory(!addSubcategory)}
              href="#"
            >
              Add Subcategory
            </Button>
          )}
        </div>
      )}

      {addCategory && (
        <div role="add-category">
          <StyledH3>Categories:</StyledH3>
          <StyledUl>
            {categories.map((category) => {
              return <StyledLi key={category.id}>{category.name}</StyledLi>;
            })}
          </StyledUl>
          <TextField
            fullWidth
            {...register('category', { required: true, minLength: 1 })}
            placeholder="New Category"
            role="category"
          />
        </div>
      )}
      {addSubcategory && (
        <div role="add-subcategory">
          <FormInputDropdown
            label="Category"
            name="categoryId"
            control={control}
            options={dataCategories.categoriesList.map((x) => ({
              roleName: 'add-subcategory-category-option',
              key: x.id,
              value: x.id,
              label: x.name,
            }))}
            changeHandler={handleAddSubcategoryCategorySelectChange}
          />
          {categoryOptionSelected && (
            <>
              <StyledH3>Subcategories:</StyledH3>
              <StyledUl>
                {subcategories.map((sub) => (
                  <StyledLi key={sub.id}>{sub.name}</StyledLi>
                ))}
              </StyledUl>
              <TextField
                label="New Subcategory"
                fullWidth
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
      <Snackbar isActive={isActive} message={message} />
    </StyledForm>
  );
}

const StyledForm = styled.form`
  margin: var(--margin-web);
  border-radius: var(--border-radius);
  display: flex;
  background-color: var(--logo-fill-color);
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  @media (max-width: 40em) {
    margin: var(--margin-mobile);
  }
`;
const StyledH3 = styled.h3`
  margin: 0;
`;
const StyledUl = styled.ul`
  -webkit-column-count: 3;
  -moz-column-count: 3;
  column-count: 3;
  font-size: large;
  margin: 0.6em 0 1em 0.6em;
`;
const StyledLi = styled.li`
  margin-bottom: 0.3em;
`;
