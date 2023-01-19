import React from 'react';
import { render, screen } from '@testing-library/react';

import ItemList from '../ItemList';
import { UserProfileContext } from '../../contexts/UserContext';
import { CartContext } from '../../contexts/CartContext';
import { MockedProvider } from '@apollo/client/testing';
import { cleanup } from '@testing-library/react';
import { INVENTORY_LIST } from '../../queries/graphQL';
import { BrowserRouter } from 'react-router-dom';

afterEach(() => {
  cleanup();
});

const mocks = [
  {
    request: {
      query: INVENTORY_LIST,
      variables: {
        applicationUserId: 1,
      },
    },
    result: {
      data: {
        inventoriesList: [
          {
            id: 1,
            description: 'winter jacket',
            manufacturerName: 'High Sierra',
            name: 'Mens',
            price: '102.25',
            itemImagesList: [
              {
                publicId: null,
                url: 'https://media.pnca.edu/system/assets/5bf31603-1061-423b-a823-5ac478d67974/square/pnca_5bf31603-1061-423b-a823-5ac478d67974_square.jpg?1437580908',
              },
              {
                publicId: null,
                url: 'https://media.pnca.edu/system/assets/785aa38a-aea2-4613-9d01-2b700c184166/square/pnca_785aa38a-aea2-4613-9d01-2b700c184166_square.jpg?1437581001',
              },
            ],
            cartsList: [
              {
                id: 7,
                quantity: 2,
                inventoryId: 1,
                applicationUserId: '1',
              },
            ],
          },
          {
            id: 2,
            description: 'Captivating Headgear',
            manufacturerName: 'Forever Summer',
            name: 'Texas A&M',
            price: '23.30',
            itemImagesList: [],
            cartsList: [],
          },
          {
            id: 3,
            description: 'adjustable back',
            manufacturerName: 'Sweet hats',
            name: 'Sinecurist golf cap',
            price: '23.30',
            itemImagesList: [],
            cartsList: [
              {
                id: 8,
                quantity: 5,
                inventoryId: 3,
                applicationUserId: 'yi0ZyXuTp8dZ0NQPx0HTqZjNFF02',
              },
            ],
          },
          {
            id: 4,
            description: 'in the cut',
            manufacturerName: 'my winter',
            name: 'Camouflage jogger',
            price: '15.00',
            itemImagesList: [],
            cartsList: [],
          },
        ],
      },
    },
  },
];

describe('ItemList tests', () => {
  render(
    <BrowserRouter>
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserProfileContext.Provider
          value={{ userProfile: { id: 1, isLoggedIn: true } }}
        >
          <CartContext.Provider value={{ setCartItems: () => {} }}>
            <ItemList />
          </CartContext.Provider>
        </UserProfileContext.Provider>
      </MockedProvider>
    </BrowserRouter>
  );
});

it('renders loading without crashing', async () => {
  expect(await screen.findByText('Loading...')).toBeInTheDocument();
  expect(await screen.findByText('High Sierra')).toBeInTheDocument();
  const cards = await screen.findAllByText('Total price:');
  expect(cards).toHaveLength(4);
  expect(screen.getByRole('item-list')).toBeInTheDocument();
});
