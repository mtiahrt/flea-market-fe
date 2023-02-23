import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import InventoryFilter from '../InventoryFilter';

const categoriesMock = [
  {
    id: 1,
    name: 'Clothes',
    subcategories: [
      {
        id: 1,
        name: 'Sweaters and Tops',
      },
      {
        id: 2,
        name: 'Dresses and Skirts',
      },
    ],
  },
  {
    id: 2,
    name: 'Jewelry and Accessories',
    subcategories: [
      {
        id: 11,
        name: 'Costume',
      },
    ],
  },
  {
    id: 5,
    name: 'Books',
    subcategories: [
      {
        id: 25,
        name: 'Young Adult',
      },
    ],
  },
];
describe('Inventory Filter tests', () => {
  afterEach(() => {
    cleanup();
  });
  beforeEach(async () => {
    setup();
    expect(screen.queryByRole('filter-selections')).toBeInTheDocument();
  });
  const setup = () => render(<InventoryFilter categories={categoriesMock} />);

  it('renders without crashing', async () => {});
});
