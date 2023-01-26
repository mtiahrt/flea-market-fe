import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import EditCategories from '../modify-items/EditCategories';
import { UserProfileContext } from '../../contexts/UserContext';
import { MockedProvider } from '@apollo/client/testing';
import { GET_CATEGORIES } from '../../queries/graphQL';

afterEach(() => {
  cleanup();
});

const apolloMock = [
  {
    request: {
      query: GET_CATEGORIES,
      variables: {},
    },
  },
  {
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
];
describe('Edit Categories tests', () => {
  function setup() {
    return render(
      <MockedProvider mocks={apolloMock} addTypename={false}>
        <UserProfileContext.Provider
          value={{ userProfile: { id: 1, isLoggedIn: true } }}
        >
          <EditCategories />{' '}
        </UserProfileContext.Provider>
      </MockedProvider>
    );
  }
  it('renders without crashing', async () => {
    setup();
    expect(await screen.findByText('Submit')).toBeInTheDocument();
  });
});
