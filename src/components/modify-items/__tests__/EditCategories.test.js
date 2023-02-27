import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import EditCategories from '../EditCategories';
import { UserProfileContext } from '../../../contexts/UserContext';
import { MockedProvider } from '@apollo/client/testing';
import {
  ADD_CATEGORY,
  ADD_SUBCATEGORY,
  GET_CATEGORIES,
} from '../../../queries/graphQL';
import userEvent from '@testing-library/user-event';

afterEach(() => {
  cleanup();
});
const addCategoryMock = {
  request: {
    query: ADD_CATEGORY,
    variables: { name: 'High Value Coins' },
  },
  result: {
    data: {
      createCategory: {
        category: {
          id: 10,
          name: 'High Value Coins',
        },
      },
    },
  },
};
const addSubcategoryMock = {
  request: {
    query: ADD_SUBCATEGORY,
    variables: { name: 'Mock Subcategory Name', categoryId: 5 },
  },
  result: {
    data: {
      createSubcategory: {
        subcategory: {
          id: 31,
          name: 'Mock Subcategory Name',
        },
      },
    },
  },
};
const apolloMock = [
  {
    request: {
      query: GET_CATEGORIES,
    },
    result: {
      data: {
        categoriesList: [
          {
            id: 5,
            name: 'Books',
            description: 'Good Reads',
            __typename: 'Category',
          },
          {
            id: 1,
            name: 'Clothes',
            description: 'Clothing Apparel',
            __typename: 'Category',
          },
          {
            id: 3,
            name: 'Fine Things',
            description: 'Art and Collectables',
            __typename: 'Category',
          },
          {
            id: 4,
            name: 'Household',
            description: 'Household goods',
            __typename: 'Category',
          },
        ],
      },
    },
  },
  addCategoryMock,
  addSubcategoryMock,
];

describe('Edit Categories tests', () => {
  beforeEach(() => {
    setup();
  });
  const setup = () =>
    render(
      <MockedProvider mocks={apolloMock}>
        <UserProfileContext.Provider
          value={{ userProfile: { id: 1, isLoggedIn: true } }}
        >
          <EditCategories />
        </UserProfileContext.Provider>
      </MockedProvider>
    );

  const clickSubcategoryAddOption = () =>
    userEvent.click(screen.getByRole('subcategory-selection'));

  const clickCancelButton = () =>
    userEvent.click(screen.getByRole('button', { name: 'Cancel' }));

  function clickPlusButton() {
    const plusIcon = screen.getByRole('plus-icon', { hidden: true });
    userEvent.click(plusIcon);
    return plusIcon;
  }

  it('renders without crashing', async () => {
    expect(await screen.findByText('Loading...')).toBeInTheDocument();
    expect(await screen.findByText('Submit')).toBeInTheDocument();
  });

  it('renders categories and subcategories dropdown options when plus button is clicked', async () => {
    expect(await screen.findByText('Submit')).toBeInTheDocument();
    clickPlusButton();
    //did the dropdown render
    const dropdownOptions = screen.getByRole('dropdown-options');
    expect(dropdownOptions).toBeInTheDocument();
  });

  it('Adding a category - renders category input and existing categories when category dropdown is selected', async () => {
    // setup();
    expect(await screen.findByText('Submit')).toBeInTheDocument();
    //page rendered now get the plus button
    clickPlusButton();
    //click the category option
    const categoryDropdown = screen.getByRole('category-selection');
    userEvent.click(categoryDropdown);
    //Is the category input rendered
    expect(screen.getByRole('category', { hidden: true })).toBeInTheDocument();
    expect(screen.queryByRole('add-category')).toBeInTheDocument();
  });

  it('Adding subcategory - renders existing categories dropdown and options when add subcategory is selected', async () => {
    expect(await screen.findByText('Submit')).toBeInTheDocument();
    //page rendered now get the plus button
    clickPlusButton();
    //click the subcategory option
    clickSubcategoryAddOption();
    //is the category select input rendered
    const catDropdown = screen.getByRole('button', {
      expanded: false,
    });
    expect(catDropdown).toBeInTheDocument();
    //check that the categories are in the dropdown
    userEvent.click(catDropdown);
    const categoryOptions = screen.getAllByRole('option', { hidden: true });
    expect(categoryOptions.length).toEqual(
      apolloMock[0].result.data.categoriesList.length
    );
  });

  it('Adding subcategory - user must select a category first', async () => {
    expect(await screen.findByText('Submit')).toBeInTheDocument();
    clickPlusButton();
    clickSubcategoryAddOption();
    //check that the subcategory input did not render
    expect(screen.queryByTestId('subcategory')).toBeNull();
  });

  it('clears the screen back to a plus sign when cancel is clicked', async () => {
    expect(await screen.findByText('Submit')).toBeInTheDocument();
    const plusIcon = clickPlusButton();
    //click the category option
    const categoryDropdown = screen.getByRole('category-selection');
    userEvent.click(categoryDropdown);
    clickCancelButton();
    //is the form cleared
    expect(screen.queryByRole('add-category')).toBeNull();
    expect(screen.queryByTestId('category-selection')).toBeNull();
    expect(screen.queryByTestId('subcategory-selection')).toBeNull();
    expect(screen.queryByRole('add-subcategory')).toBeNull();

    //adding a subcategory
    userEvent.click(plusIcon);
    clickSubcategoryAddOption();
    const buttons = screen.getAllByRole('button');
    const existingCategoriesDropdown = buttons.find((x) =>
      x.classList.contains('MuiSelect-select')
    );
    userEvent.click(existingCategoriesDropdown);
    //now select a dropdown option
    const options = screen.getAllByRole('option');
    userEvent.click(options[0]);
    clickCancelButton();
    expect(screen.queryByRole('add-category')).toBeNull();
    expect(screen.queryByTestId('category-selection')).toBeNull();
    expect(screen.queryByTestId('subcategory-selection')).toBeNull();
    expect(screen.queryByRole('add-subcategory')).toBeNull();
  });

  it('Adding subcategory - subcategory input is disabled if no category is selected', async () => {
    expect(await screen.findByText('Submit')).toBeInTheDocument();
    clickPlusButton();
    clickSubcategoryAddOption();
    const subCatInput = screen.queryByTestId('subcategory');
    expect(subCatInput).toBeNull();
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    //select an option
    const buttons = screen.getAllByRole('button');
    const existingCategoriesDropdown = buttons.find((x) =>
      x.classList.contains('MuiSelect-select')
    );
    userEvent.click(existingCategoriesDropdown);
    const options = screen.getAllByRole('option');
    userEvent.click(options[0]);
    userEvent.click(cancelButton);
    clickPlusButton();
    clickSubcategoryAddOption();
    const subCatInput2 = screen.queryByTestId('subcategory');
    expect(subCatInput2).toBeNull();
  });

  it('Adding category - New category is added to the list', async () => {
    expect(await screen.findByText('Submit')).toBeInTheDocument();
    clickPlusButton();
    const categoryDropdown = screen.getByRole('category-selection');
    userEvent.click(categoryDropdown);
    const categoryInput = screen.getByRole('category');
    userEvent.type(
      categoryInput,
      addCategoryMock.result.data.createCategory.category.name
    );
    //submit
    userEvent.click(screen.getByRole('button', { name: 'Submit' }));
    expect(await screen.findByText(categoryInput.value)).toBeInTheDocument();
  });

  it('Adding subcategory - New subcategory is added to the list', async () => {
    expect(await screen.findByText('Submit')).toBeInTheDocument();
    clickPlusButton();
    clickSubcategoryAddOption();
    const buttons = screen.getAllByRole('button');
    const existingCategoriesDropdown = buttons.find((x) =>
      x.classList.contains('MuiSelect-select')
    );
    userEvent.click(existingCategoriesDropdown);
    //now select a dropdown option
    const options = screen.getAllByRole('option');
    userEvent.click(options[0]);
    const subcategoryInput = screen.getByRole('subcategory');
    userEvent.type(
      subcategoryInput,
      addSubcategoryMock.result.data.createSubcategory.subcategory.name
    );
    userEvent.click(screen.getByRole('button', { name: 'Submit' }));
    expect(await screen.findByText(subcategoryInput.value)).toBeInTheDocument();
  });
});
