import './App.css';
import NavBar from './nav/NavBar';
import NavItem from './nav/NavItem';
import { BrowserRouter as Router } from 'react-router-dom';
import NavItemProfile from './nav/NavItemProfile';
import { ReactComponent as PlusIcon } from './icons/plus.svg';
import { ReactComponent as ShoppingCartIcon } from './icons/shopping-cart.svg';
import { ReactComponent as HomeIcon } from './icons/home.svg';
import { useState } from 'react';
import { UserProfileContext } from './contexts/UserContext';
import CheckOut from './components/checkout/CheckOut';
import { CartContextProvider } from './contexts/CartContext';
import DropdownMenu from './nav/DropdownMenu';
import FleaMarketRoutes from './FleaMarketRoutes';
import FleaMarketProvider from './FleaMarketProvider';

import { red } from '@mui/material/colors';
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material/styles';

let theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
  },
  typography: {
    fontFamily: ['"Work Sans"', 'sans-serif'],
  },
});
theme = responsiveFontSizes(theme);
function App() {
  const [userProfile, setUserProfile] = useState({});
  console.log('App component is rendering');
  return (
    <div className="App">
      <Router>
        <UserProfileContext.Provider value={{ userProfile, setUserProfile }}>
          <FleaMarketProvider>
            <ThemeProvider theme={theme}>
              <NavBar>
                <NavItemProfile imgURL={userProfile.photoURL} />
                <NavItem url={'#'} icon={<HomeIcon name="home" />}></NavItem>
                <NavItem
                  url={'CheckOut'}
                  icon={<ShoppingCartIcon name="shoppingCart" />}
                ></NavItem>
                <NavItem
                  isDropdown={true}
                  url={''}
                  icon={<PlusIcon name="plus" />}
                >
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

export default App;
