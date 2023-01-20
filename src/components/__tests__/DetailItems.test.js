import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { UserProfileContext } from '../../contexts/UserContext';
import DetailedItem from '../DetailedItem';
import { CartContext } from '../../contexts/CartContext';
import { MockedProvider } from '@apollo/client/testing';
import CartContextModel from '../../models/CartContextModel';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { GET_INVENTORY_ITEM } from '../../queries/graphQL';

afterEach(() => {
  cleanup();
});
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

describe('DetailItems tests', () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter
        initialEntries={[
          {
            pathname: 'DetailItem/1',
            state: {
              inventoryId: mocks[0].result.data.inventory.id,
              isInCart: false,
            },
          },
        ]}
      >
        <CartContext.Provider value={{ setCartItems: () => {} }}>
          <UserProfileContext.Provider
            value={{ userProfile: { id: 1, isLoggedIn: true } }}
          >
            <DetailedItem />
          </UserProfileContext.Provider>
        </CartContext.Provider>
      </MemoryRouter>
    </MockedProvider>
  );

  it('renders without crashing', async () => {
    expect(await screen.findByText('Loading...')).toBeInTheDocument();
    expect(await screen.findByText('Item Details')).toBeInTheDocument();
  });
});
