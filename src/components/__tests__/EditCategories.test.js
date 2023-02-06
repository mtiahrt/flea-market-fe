import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import EditCategories from '../modify-items/EditCategories';
import { UserProfileContext } from '../../contexts/UserContext';
import { MockedProvider } from '@apollo/client/testing';
import { GET_CATEGORIES } from '../../queries/graphQL';
import userEvent from '@testing-library/user-event';

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
          {
            id: 2,
            name: 'Jewelry and Accessories',
            description: 'Gems and valuables',
            __typename: 'Category',
          },
          {
            id: 6,
            name: 'New Arrivals',
            description: 'Our latest products',
            __typename: 'Category',
          },
          {
            id: 7,
            name: 'Sale',
            description: 'Price discounted',
            __typename: 'Category',
          },
        ],
      },
    },
  },
];
function setup() {
  return render(
    <MockedProvider mocks={apolloMock}>
      <UserProfileContext.Provider
        value={{ userProfile: { id: 1, isLoggedIn: true } }}
      >
        <EditCategories />
      </UserProfileContext.Provider>
    </MockedProvider>
  );
}

afterEach(() => {
  console.log('clean up run');
  cleanup();
});
describe('Edit Categories tests', () => {
  it('renders without crashing', async () => {
    setup();
    expect(await screen.findByText('Loading...')).toBeInTheDocument();
    expect(await screen.findByText('Submit')).toBeInTheDocument();
  });

  it('renders categories and subcategories dropdown options when plus button is clicked', async () => {
    setup();
    expect(await screen.findByText('Loading...')).toBeInTheDocument();
    expect(await screen.findByText('Submit')).toBeInTheDocument();
    //page rendered now get the plus button
    const plusIcon = screen.getByRole('plus-icon', { hidden: true });
    userEvent.click(plusIcon);
    //did the dropdown render
    const dropdownOptions = screen.getByRole('dropdown-options');
    expect(dropdownOptions).toBeInTheDocument();
  });

  it('Adding a category - renders category input and existing categories when category dropdown is selected', async () => {
    setup();
    expect(await screen.findByText('Loading...')).toBeInTheDocument();
    expect(await screen.findByText('Submit')).toBeInTheDocument();
    //page rendered now get the plus button
    const plusIcon = screen.getByRole('plus-icon', { hidden: true });
    userEvent.click(plusIcon);
    //click the category option
    const categoryDropdown = screen.getByTestId('category-selection', {
      hidden: true,
    });
    userEvent.click(categoryDropdown);
    //Is the category input rendered
    expect(screen.getByRole('category', { hidden: true })).toBeInTheDocument();
    expect(screen.queryByRole('add-category')).toBeInTheDocument();
  });

  it('Adding subcategory - renders existing categories dropdown and options when add subcategory is selected', async () => {
    setup();
    expect(await screen.findByText('Loading...')).toBeInTheDocument();
    expect(await screen.findByText('Submit')).toBeInTheDocument();
    //page rendered now get the plus button
    const plusIcon = screen.getByRole('plus-icon', { hidden: true });
    userEvent.click(plusIcon);
    //click the subcategory option
    const subcategoryDropdown = screen.getByTestId('subcategory-selection', {
      hidden: true,
    });
    userEvent.click(subcategoryDropdown);
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
    console.log(categoryOptions);
  });

  it('Adding subcategory - user must select a category first', async () => {
    setup();
    expect(await screen.findByText('Loading...')).toBeInTheDocument();
    expect(await screen.findByText('Submit')).toBeInTheDocument();
    const plusIcon = screen.getByRole('plus-icon', { hidden: true });
    userEvent.click(plusIcon);
    const subcategoryDropdown = screen.getByTestId('subcategory-selection', {
      hidden: true,
    });
    userEvent.click(subcategoryDropdown);
    //check that the subcategory input did not render
    expect(screen.queryByTestId('subcategory')).toBeNull();
  });

  it('clears the screen back to a plus sign when cancel is clicked', async () => {
    setup();
    expect(await screen.findByText('Loading...')).toBeInTheDocument();
    expect(await screen.findByText('Submit')).toBeInTheDocument();
    //adding a category
    const plusIcon = screen.getByRole('plus-icon', { hidden: true });
    userEvent.click(plusIcon);
    //click the category option
    const categoryDropdown = screen.getByTestId('category-selection', {
      hidden: true,
    });
    userEvent.click(categoryDropdown);
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    userEvent.click(cancelButton);
    //is the form cleared
    expect(screen.queryByRole('add-category')).toBeNull();
    expect(screen.queryByTestId('category-selection')).toBeNull();
    expect(screen.queryByTestId('subcategory-selection')).toBeNull();
    //adding a subcategory
    userEvent.click(plusIcon);
    const subcategoryDropdown = screen.getByRole('subcategory-selection');
    userEvent.click(subcategoryDropdown);
    const buttons = screen.getAllByRole('button');
    console.log(buttons);
    const existingCategoriesDropdown = buttons.find((x) =>
      x.classList.contains('MuiSelect-select')
    );
    userEvent.click(existingCategoriesDropdown);
    //now select a dropdown option
    const options = screen.getAllByRole('option');
    userEvent.click(options[0]);
    userEvent.click(cancelButton);
    expect(screen.queryByRole('add-category')).toBeNull();
    expect(screen.queryByTestId('category-selection')).toBeNull();
    expect(screen.queryByTestId('subcategory-selection')).toBeNull();
    expect(screen.queryByRole('add-subcategory')).toBeNull();
    screen.debug();
  });
});
