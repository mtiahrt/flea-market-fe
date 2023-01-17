import { render, screen } from '@testing-library/react';
import React from 'react';
import BasicCard from '../BasicCard';
import { BrowserRouter } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import { UserProfileContext } from '../../contexts/UserContext';

const mock = {
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
  cartsList: [],
};

describe('Basic card tests', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <UserProfileContext.Provider
          value={{ userProfile: { id: 1, isLoggedIn: true } }}
        >
          <CartContext.Provider
            value={{
              setAddItemToCart: () => {},
              setRemoveItemFromCart: () => {},
            }}
          >
            <BasicCard inventoryItem={mock}></BasicCard>
          </CartContext.Provider>
        </UserProfileContext.Provider>
      </BrowserRouter>
    );
  });
  it('renders basic card without crashing', async () => {
    expect(await screen.findByText('High Sierra')).toBeInTheDocument();
  });
});
