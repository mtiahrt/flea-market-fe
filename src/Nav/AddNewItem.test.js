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

it("price field allows numbers and only 1 decimal only", () => {
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
    //check that decimal is included
    fireEvent.change(input, {target: {value: '35.'}});
    expect(input.value).toBe('35.');
    fireEvent.change(input, {target: {value: '35..'}});
    expect(input.value).toBe('35.');
    fireEvent.change(input, {target: {value: '35.wd.'}});
    expect(input.value).toBe('35.');
    fireEvent.change(input, {target: {value: '35.21'}});
    expect(input.value).toBe('35.21');
    fireEvent.change(input, {target: {value: '35.21a'}});
    expect(input.value).toBe('35.21');
});

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
  expect(saveButton).toBeDisabled();
  
  const priceInput = component.getByLabelText('price-input');
  fireEvent.change(priceInput, {target: {value: '35.21'}});
  //test that the button is enabled
  expect(saveButton).toBeEnabled();
});

it("save button enabled when appropriate", () => {

});

it("upload image allows only the supported formats", ()=> {

})