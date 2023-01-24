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
  function setup(isInCart) {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter
          initialEntries={[
            {
              pathname: 'DetailItem/1',
              state: {
                inventoryId: mocks[0].result.data.inventory.id,
                isInCart: isInCart,
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
  }

  it('renders without crashing', async () => {
    setup();
    expect(await screen.findByText('Loading...')).toBeInTheDocument();
    expect(await screen.findByText('Item Details')).toBeInTheDocument();
  });

  it('Button text is Add to Cart when isInCart is false', async () => {
    setup(false);
    const button = await screen.findByText('Add to Cart');
    expect(button).toBeInTheDocument();
  });
  it('Button text is Remove from cart when isInCart is true', async () => {
    setup(true);
    const button = await screen.findByText('Remove from cart');
    expect(button).toBeInTheDocument();
  });
  it('Click remove from cart button', async () => {
    setup(true);
    const removeFn = jest.spyOn(Screen.prototype, 'setRemoveItemFromCart');
    const button = await screen.findByText('Remove from cart');
    button.click();
    expect(removeFn).toHaveBeenCalled();
  });
});
