import React from 'react';
import ReactDOM from 'react-dom'
import NewItem from './AddNewItem';
import {fireEvent, render, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom';

afterEach(() => {
  cleanup();
});

const setup = () => {
    return render(<NewItem />);
  }

it("renders without crashing", () => {
    const div = document.createElement('div');
    ReactDOM.render(<NewItem/>, div);
});

it("price field allows numbers only", () => {
  //get the price field
    const component = setup();
    const input = component.getByLabelText('price-input')
    //put letters and numbers in it
    fireEvent.change(input, {target: {value: '/!@#$%^&*()!+=,`~{};"<>?-[]"\"'}});
    expect(input.value).toBe('');
    fireEvent.change(input, {target: {value: '3'}});
    expect(input.value).toBe('3');
    fireEvent.change(input, {target: {value: '35'}});
    expect(input.value).toBe('35');
    fireEvent.change(input, {target: {value: '35.21'}});
    expect(input.value).toBe('35.21');
    fireEvent.change(input, {target: {value: '35.21a'}});
    expect(input.value).toBe('35.21');
});

it("price only allows 1 decimal", (() => {
  //get the price field
  const component = setup();
  const input = component.getByLabelText('price-input');
  //put numbers with 1 decimal
  fireEvent.change(input, {target: {value: '82'}});
  expect(input.value).toBe('82');
  fireEvent.change(input, {target: {value: '82.'}});
  expect(input.value).toBe('82.');
  fireEvent.change(input, {target: {value: '82..'}});
  expect(input.value).toBe('82.');
  fireEvent.change(input, {target: {value: '82..swd'}});
  expect(input.value).toBe('82.');
}));

it("save button disabled when appropriate", () => {
  const component = setup();
  const saveButton = component.getByLabelText('save-item');
  
  const titleInput = component.getByLabelText('title-input');
  fireEvent.change(titleInput, {target: {value: 'Test title'}});
  expect(saveButton).toBeDisabled();
  
  const nameInput = component.getByLabelText('name-input');
  fireEvent.change(nameInput, {target: {value: 'Test name'}});
  expect(saveButton).toBeDisabled();
  
  const descriptionInput = component.getByLabelText('description-input');
  fireEvent.change(descriptionInput, {target: {value: 'Test description'}});
  //leave price field empty 
  expect(saveButton).toBeDisabled();
});

it("save button enabled when appropriate", () => {
  const component = setup();
  const saveButton = component.getByLabelText('save-item');

  const titleInput = component.getByLabelText('title-input');
  fireEvent.change(titleInput, {target: {value: 'Test title'}});
  const nameInput = component.getByLabelText('name-input');
  fireEvent.change(nameInput, {target: {value: 'Test name'}});
  const descriptionInput = component.getByLabelText('description-input');
  fireEvent.change(descriptionInput, {target: {value: 'Test description'}});
  const priceInput = component.getByLabelText('price-input');
  fireEvent.change(priceInput, {target: {value: '35.21'}});
  //test that the button is enabled
  expect(saveButton).toBeEnabled();
});

it("upload image allows only the supported formats", ()=> {

})