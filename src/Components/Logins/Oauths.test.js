import React from 'react';
import ReactDOM from 'react-dom';
import FacebookLogin from './Facebook';
import {fireEvent, render, cleanup, screen, findByText} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';


it("renders without crashing", () => {
    const div = document.createElement('div');
    ReactDOM.render(<FacebookLogin/>, div);
});

// it('clicking the login button gets a code back', () => {
//     const div = document.createElement('div');
//     const component = render(<FacebookLogin />, div);
//     const loginButton = component.getByText('Login');
//     loginButton.click();
    
// })