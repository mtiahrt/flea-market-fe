import { render, screen } from '@testing-library/react';
import React from 'react';
import ProductDetails from '../ProductDetails';
import { BrowserRouter } from 'react-router-dom';

const mockWithImages = {
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
      url: null,
    },
    {
      __typename: 'ItemImage',
      publicId: null,
      url: null,
    },
  ],
  cartsList: [],
};

const mockWithoutImages = {
  __typename: 'Inventory',
  id: 1,
  description: 'winter jacket',
  manufacturerName: 'High Sierra',
  name: 'Mens',
  price: '102.25',
  itemImagesList: [],
  cartsList: [],
};

describe('Product Details tests', () => {
  it('renders product details without crashing', async () => {
    render(
      <BrowserRouter>
        <ProductDetails productDetails={mockWithImages}></ProductDetails>
      </BrowserRouter>
    );
    expect(await screen.findByText('High Sierra')).toBeInTheDocument();
  });

  it('renders image not found when no image giving', async () => {
    const { container } = render(
      <BrowserRouter>
        <ProductDetails productDetails={mockWithoutImages}></ProductDetails>
      </BrowserRouter>
    );
    expect(container.getElementsByClassName('product-image').length).toBe(1);
    expect(
      container.querySelector('img[data-id="1"]').getAttribute('alt')
    ).toMatch(/No Image/);
  });

  it('renders image when image given', async () => {
    const { container } = render(
      <BrowserRouter>
        <ProductDetails productDetails={mockWithImages}></ProductDetails>
      </BrowserRouter>
    );
    expect(container.getElementsByClassName('product-image').length).toBe(1);
    expect(
      container.querySelector('img[data-id="1"]').getAttribute('alt')
    ).toMatch(/Product image/);
  });
});
