import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { GET_CATEGORIES_WITH_SUBCATEGORIES } from '../../queries/graphQL';
import InventoryFilter from '../InventoryFilter';

afterEach(() => {
  cleanup();
});

const apolloMock = [
  {
    request: {
      query: GET_CATEGORIES_WITH_SUBCATEGORIES,
    },
    result: {
      data: {
        categoriesList: [
          {
            id: 1,
            name: 'Clothes',
            description: 'Clothing Apparel',
            subcategoriesList: [
              {
                id: 1,
                name: 'Sweaters and Tops',
                description: null,
              },
              {
                id: 2,
                name: 'Dresses and Skirts',
                description: null,
              },
              {
                id: 3,
                name: 'Coats and Jackets',
                description: null,
              },
            ],
          },
          {
            id: 5,
            name: 'Books',
            description: 'Good Reads',
            subcategoriesList: [
              {
                id: 24,
                name: 'kids',
                description: null,
              },
              {
                id: 25,
                name: 'Young Adult',
                description: null,
              },
            ],
          },
        ],
      },
    },
  },
];

describe('Inventory Filter tests', () => {
  beforeEach(async () => {
    setup();
    expect(await screen.findByText('Loading...')).toBeInTheDocument();
    expect(await screen.findByRole('1')).toBeInTheDocument();
  });
  const setup = () =>
    render(
      <MockedProvider mocks={apolloMock}>
        <InventoryFilter />
      </MockedProvider>
    );

  it('renders without crashing', async () => {});
  it('renders all available categories', async () => {
    expect(screen.getAllByRole('button').length).toEqual(2);
  });
});
