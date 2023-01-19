import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { UserProfileContext } from '../../contexts/UserContext';
import { CartContext } from '../../contexts/CartContext';
import BasicCard from '../BasicCard';
import { MockedProvider } from '@apollo/client/testing';
import CartContextModel from '../../models/CartContextModel';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

afterEach(() => {
  cleanup();
});
const inventoryItem = {
  __typename: 'Inventory',
  id: 1,
  description: 'winter jacket',
  manufacturerName: 'High Sierra',
  name: 'Mens',
  price: '102.25',
  itemImagesList: [
    {
      __typename: 'ItemImage',
      publicId: null,
      url: 'https://media.pnca.edu/system/assets/5bf31603-1061-423b-a823-5ac478d67974/square/pnca_5bf31603-1061-423b-a823-5ac478d67974_square.jpg?1437580908',
    },
    {
      __typename: 'ItemImage',
      publicId: null,
      url: 'https://media.pnca.edu/system/assets/785aa38a-aea2-4613-9d01-2b700c184166/square/pnca_785aa38a-aea2-4613-9d01-2b700c184166_square.jpg?1437581001',
    },
  ],
  cartsList: [{ id: 20 }],
};
const cartMock = [new CartContextModel(20, 3, 30.0)];
const apolloMock = [];
describe('BasicCard tests', () => {
  function setup(isInCart) {
    return render(
      <MockedProvider mocks={apolloMock} addTypename={false}>
        <UserProfileContext.Provider
          value={{ userProfile: { id: 1, isLoggedIn: true } }}
        >
          <CartContext.Provider
            value={{
              cartItems: isInCart ? cartMock : [],
              setCartItems: () => console.log('setCartItems was fired'),
            }}
          >
            <BrowserRouter>
              <BasicCard
                inventoryItem={
                  isInCart ? inventoryItem : { ...inventoryItem, cartsList: [] }
                }
                link="DetailedItem/1"
                isItemInCart={isInCart}
              />
            </BrowserRouter>
          </CartContext.Provider>
        </UserProfileContext.Provider>
      </MockedProvider>
    );
  }

  it('renders without crashing', async () => {
    setup();
    expect(await screen.findByText('High Sierra')).toBeInTheDocument();
  });

  it('clicks cart button to remove icon changes to disabled(gray)', async () => {
    setup(true);
    const button = screen.getByRole('button');
    userEvent.click(button);
    const icon = screen.getByRole('cart-icon', { hidden: true });
    expect(icon).toHaveClass('MuiSvgIcon-colorDisabled');
  });
  it('clicks cart button to add icon changes to Primary(blue)', async () => {
    setup(false);
    const button = screen.getByRole('button');
    userEvent.click(button);
    const icon = screen.getByRole('cart-icon', { hidden: true });
    expect(icon).toHaveClass('MuiSvgIcon-colorPrimary');
  });
});
