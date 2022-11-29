import React from 'react';
import ReactDOM from 'react-dom';
import { MockedProvider } from '@apollo/client/testing';
import NewItem, { ADD_SALE_ITEM } from './AddNewItem';
import {
  fireEvent,
  render,
  cleanup,
  screen,
  findByText,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

afterEach(() => {
  cleanup();
});
const mockValues = {
  name: 'Marks Mock',
  description: 'Mock Description',
  manufacturerName: 'Mock Manufacturer',
  price: '9.99',
};
const mocks = [
  {
    request: {
      query: ADD_SALE_ITEM,
      variables: {
        name: mockValues.name,
        description: mockValues.description,
        manufacturerName: mockValues.manufacturerName,
        price: mockValues.price,
      },
    },
    result: {
      data: {
        createInventory: {
          inventory: {
            id: 51,
            name: 'Used a parameter2',
            description: 'parameter description2',
            manufacturerName: mockValues.manufacturerName,
            subcategoryId: 7,
            price: '13.95',
          },
        },
      },
    },
  },
];
const setup = () => {
  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <NewItem />
    </MockedProvider>
  );
};
const enableSaveButton = () => {
  const component = setup();
  const titleInput = component.getByLabelText('title-input');
  fireEvent.change(titleInput, {
    target: { value: mockValues.manufacturerName },
  });

  const nameInput = component.getByLabelText('name-input');
  fireEvent.change(nameInput, { target: { value: mockValues.name } });

  const descriptionInput = component.getByLabelText('description-input');
  fireEvent.change(descriptionInput, {
    target: { value: mockValues.description },
  });

  const priceInput = component.getByLabelText('price-input');
  fireEvent.change(priceInput, { target: { value: mockValues.price } });
  return component;
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <NewItem />
    </MockedProvider>,
    div
  );
});

it('price field allows numbers only', () => {
  //get the price field
  const component = setup();
  const input = component.getByLabelText('price-input');
  //put letters and numbers in it
  fireEvent.change(input, {
    target: { value: '/!@#$%^&*()!+=,`~{};"<>?-[]""' },
  });
  expect(input.value).toBe('');
  fireEvent.change(input, { target: { value: '3' } });
  expect(input.value).toBe('3');
  fireEvent.change(input, { target: { value: '35' } });
  expect(input.value).toBe('35');
  fireEvent.change(input, { target: { value: '35.21' } });
  expect(input.value).toBe('35.21');
  fireEvent.change(input, { target: { value: '35.21a' } });
  expect(input.value).toBe('35.21');
});

it('price only allows 1 decimal', () => {
  //get the price field
  const component = setup();
  const input = component.getByLabelText('price-input');
  //put numbers with 1 decimal
  fireEvent.change(input, { target: { value: '82' } });
  expect(input.value).toBe('82');
  fireEvent.change(input, { target: { value: '82.' } });
  expect(input.value).toBe('82.');
  fireEvent.change(input, { target: { value: '82..' } });
  expect(input.value).toBe('82.');
  fireEvent.change(input, { target: { value: '82..swd' } });
  expect(input.value).toBe('82.');
});

it('save button disabled when appropriate', () => {
  const component = setup();
  const saveButton = component.getByLabelText('save-item');

  const titleInput = component.getByLabelText('title-input');
  fireEvent.change(titleInput, { target: { value: 'Test title' } });
  expect(saveButton).toBeDisabled();

  const nameInput = component.getByLabelText('name-input');
  fireEvent.change(nameInput, { target: { value: 'Test name' } });
  expect(saveButton).toBeDisabled();

  const descriptionInput = component.getByLabelText('description-input');
  fireEvent.change(descriptionInput, { target: { value: 'Test description' } });
  //leave price field empty
  expect(saveButton).toBeDisabled();
});

it('save button enabled when appropriate', () => {
  const component = setup();
  const saveButton = component.getByLabelText('save-item');

  const titleInput = component.getByLabelText('title-input');
  fireEvent.change(titleInput, { target: { value: 'Test title' } });
  const nameInput = component.getByLabelText('name-input');
  fireEvent.change(nameInput, { target: { value: 'Test name' } });
  const descriptionInput = component.getByLabelText('description-input');
  fireEvent.change(descriptionInput, { target: { value: 'Test description' } });
  const priceInput = component.getByLabelText('price-input');
  fireEvent.change(priceInput, { target: { value: '35.21' } });
  //test that the button is enabled
  expect(saveButton).toBeEnabled();
});

it('should render loading initially after save click', () => {
  //button must be enabled before it can be clicked
  enableSaveButton();

  //now submit the form by click event
  userEvent.click(screen.getByText('Save'));

  //test if "loading..." <p> tag is pressent
  expect(screen.getByText('Loading....')).toBeInTheDocument();
});

it('should render manufacturer name that was added when mutation is completed', async () => {
  //button must be enabled before it can be clicked
  const component = enableSaveButton();

  //now submit the form by click event
  userEvent.click(screen.getByText('Save'));
  const addedTag = await findByText(
    component.container,
    mockValues.manufacturerName + ' was added successfully'
  );
  expect(addedTag).toBeInTheDocument();
});
