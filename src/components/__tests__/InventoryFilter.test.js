import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { UserProfileContext } from '../../contexts/UserContext';
import userEvent from '@testing-library/user-event';
import FleaMarketRoutes from '../../FleaMarketRoutes';
import { CartContextProvider } from '../../contexts/CartContext';
import Inventory from '../Inventory';
import { MockedProvider } from '@apollo/client/testing';
import { INVENTORY_LIST } from '../../queries/graphQL';

afterEach(() => {
  cleanup();
});
const apolloMock = [
  {
    request: {
      query: INVENTORY_LIST,
      variables: { applicationUserId: 'abc' },
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
            cartsList: [],
          },
          {
            id: 2,
            description: 'Captivating Headgear',
            manufacturerName: 'Forever Summer',
            name: 'Texas A&M',
            price: '23.30',
            itemImagesList: [],
            cartsList: [
              {
                id: 68,
                quantity: 4,
                inventoryId: 2,
                applicationUserId: 'abc',
              },
            ],
          },
        ],
      },
    },
  },
];

describe('Inventory Filter tests', () => {
  const setup = () =>
    render(
      <UserProfileContext.Provider
        value={{ userProfile: { id: 'abc', isLoggedIn: true } }}
      >
        <CartContextProvider>
          <BrowserRouter>
            <MockedProvider mocks={apolloMock}>
              <Inventory />
            </MockedProvider>
          </BrowserRouter>
        </CartContextProvider>
      </UserProfileContext.Provider>
    );
  it('renders nav bar without crashing', async () => {
    setup();
    expect(await screen.findByText('Loading...')).toBeInTheDocument();
    expect(await screen.findByText('Error :(')).toBeInTheDocument();
    screen.debug();
  });
});
