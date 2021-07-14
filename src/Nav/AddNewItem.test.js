import React from 'react';
import ReactDOM from 'react-dom'
import NewItem from './AddNewItem';
import {fireEvent, render} from '@testing-library/react';
import '@testing-library/jest-dom';

const setup = labelText => {
    const utils = render(<NewItem />);
    const input = utils.getByLabelText(labelText)
    return {
      input,
      ...utils,
    }
  }

it("renders without crashing", () => {
    const div = document.createElement('div');
    ReactDOM.render(<NewItem/>, div);
});

it("price field allows numbers and only 1 decimal only", () => {
    //get the price field
    const {input} = setup('price-input');
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
    
});

it("save button enabled when appropriate", () => {

});

it("upload image allows only the supported formats", ()=> {

})