import './App.css';
import NavBar from './nav/NavBar';
import NavItem from './nav/NavItem';
import { BrowserRouter as Router } from 'react-router-dom';
import NavItemProfile from './nav/NavItemProfile';
import { ReactComponent as PlusIcon } from './icons/plus.svg';
import { ReactComponent as ShoppingCartIcon } from './icons/shopping-cart.svg';
import { ReactComponent as HomeIcon } from './icons/home.svg';
import React, { useState } from 'react';
import { UserProfileContext } from './contexts/UserContext';
import CheckOut from './Components/checkout/CheckOut';
import { CartContextProvider } from './contexts/CartContext';
import DropdownMenu from './nav/DropdownMenu';
import FleaMarketRoutes from './FleaMarketRoutes';
import FleaMarketProvider from './FleaMarketProvider';
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material/styles';
import styled from 'styled-components';

let theme = createTheme({
  palette: {
    primary: {
      main: '#50385C',
    },
    secondary: {
      main: '#BFB1C5',
    },
  },
  typography: {
    fontFamily: ['"Work Sans"', 'sans-serif'],
  },
});
theme = responsiveFontSizes(theme);
function App() {
  //Todo: add and remove administrator buttons based on user type
  const [userProfile, setUserProfile] = useState({});
  console.log('App component is rendering');
  return (
    <div className="App">
      <Router>
        <UserProfileContext.Provider value={{ userProfile, setUserProfile }}>
          <FleaMarketProvider>
            <ThemeProvider theme={theme}>
              <StyledHeader>
                <h1>Shop Wild Heather</h1>
              </StyledHeader>
              <NavBar>
                <NavItemProfile imgURL={userProfile.photoURL} />
                <NavItem url={'#'} icon={<HomeIcon name="home" />}></NavItem>
                <NavItem
                  url={'CheckOut'}
                  icon={<ShoppingCartIcon name="shoppingCart" />}
                ></NavItem>
                <NavItem isDropdown={true} icon={<PlusIcon name="plus" />}>
                  <DropdownMenu />
                </NavItem>
              </NavBar>
              <CartContextProvider>
                <FleaMarketRoutes userProfile={userProfile} />
              </CartContextProvider>
            </ThemeProvider>
          </FleaMarketProvider>
        </UserProfileContext.Provider>
      </Router>
    </div>
  );
}
const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: var(--header-color);
  color: var(--text-color-header);
`;
export default App;
