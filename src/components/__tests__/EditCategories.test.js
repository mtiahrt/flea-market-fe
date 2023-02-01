import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import EditCategories from '../modify-items/EditCategories';
import { UserProfileContext } from '../../contexts/UserContext';
import { MockedProvider } from '@apollo/client/testing';
import { GET_CATEGORIES, GET_INVENTORY_ITEM } from '../../queries/graphQL';
import userEvent from '@testing-library/user-event';

afterEach(() => {
  cleanup();
});

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
const mocks = [
  {
    request: {
      query: GET_INVENTORY_ITEM,
      variables: {
        inventoryId: 1,
      },
    },
    result: {
      data: {
        inventory: {
          id: 1,
          description: 'adjustable back',
          manufacturerName: 'Sweet hats',
          name: 'Pinehurst golf cap',
          price: '23.30',
          quantity: 23,
          itemImagesList: [],
          subcategory: {
            description: null,
            name: 'Sweaters and Tops',
          },
          cartsList: [
            {
              id: 63,
              quantity: 1,
            },
          ],
        },
      },
    },
  },
];
describe('Edit Categories tests', () => {
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
    const plusIcon = screen.getByRole('categories-plus-icon', { hidden: true });
    userEvent.click(plusIcon);
    //did the dropdown render
    const dropdownOptions = screen.getByRole('dropdown-options');
    expect(dropdownOptions).toBeInTheDocument();
  });

  it('renders category input and existing categories when category dropdown is selected', async () => {
    setup();
    expect(await screen.findByText('Loading...')).toBeInTheDocument();
    expect(await screen.findByText('Submit')).toBeInTheDocument();
    //page rendered now get the plus button
    const plusIcon = screen.getByRole('categories-plus-icon', { hidden: true });
    userEvent.click(plusIcon);
    //click the category option
    const categoryDropdown = screen.getByRole('category-selection', {
      hidden: true,
    });
    userEvent.click(categoryDropdown);
    //Is the category input rendered
    expect(screen.getByRole('category', { hidden: true })).toBeInTheDocument();
    expect(screen.getByRole('categories-list')).toBeInTheDocument();
  });

  it('renders existing categories dropdown when subcategory dropdown is selected', async () => {
    setup();
    expect(await screen.findByText('Loading...')).toBeInTheDocument();
    expect(await screen.findByText('Submit')).toBeInTheDocument();
    //page rendered now get the plus button
    const plusIcon = screen.getByRole('categories-plus-icon', { hidden: true });
    userEvent.click(plusIcon);
    //click the category option
    const subcategoryDropdown = screen.getByRole('subcategory-selection', {
      hidden: true,
    });
    userEvent.click(subcategoryDropdown);
    //is the category select input rendered
    expect(screen.getByRole('category-dropdown')).toBeInTheDocument();
  });

  it('when a new subcategory to be created user must select a category first', async () => {
    setup();
    expect(await screen.findByText('Loading...')).toBeInTheDocument();
    expect(await screen.findByText('Submit')).toBeInTheDocument();
    const plusIcon = screen.getByRole('render-subcategories', { hidden: true });
    userEvent.click(plusIcon);
    //did the category select input render
    expect(screen.getByRole('category-dropdown')).toBeInTheDocument();
    //check that the subcategory input did not render
    expect(screen.getByRole('subcategory')).not.toBeInTheDocument();
  });

  it('when a new subcategory to be created user selects a category the subcategory input is rendered', async () => {
    setup();
    expect(await screen.findByText('Loading...')).toBeInTheDocument();
    expect(await screen.findByText('Submit')).toBeInTheDocument();
    const plusIcon = screen.getByRole('render-subcategories', { hidden: true });
    userEvent.click(plusIcon);
    //did the category select input render
    const dropdown = screen.getByRole('category-dropdown');
    expect(dropdown).toBeInTheDocument();
    userEvent.click(dropdown);
    //select a category in the dropdown
    const dropdownOption = screen.getByRole('clothing-option', {
      hidden: true,
    });
    userEvent.click(dropdownOption);
    expect(screen.getByRole('subcategory')).toBeInTheDocument();
  });
});
