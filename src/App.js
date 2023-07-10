import './App.css';
import NavBar from './nav/NavBar';
import NavItem from './nav/NavItem';
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactComponent as PlusIcon } from './icons/plus.svg';
import { ReactComponent as ShoppingCartIcon } from './icons/shopping-cart.svg';
import { ReactComponent as HomeIcon } from './icons/home.svg';
import { ReactComponent as SaleIcon } from './icons/sale-svgrepo-com.svg';
import { ReactComponent as CategoryIcon } from './icons/category-svgrepo-com.svg';
import { ReactComponent as ProfileIcon } from './icons/profile.svg';
import { ReactComponent as LoginOutIcon } from './icons/login-out.svg';
import React, { useState } from 'react';
import { UserContext } from './contexts/UserContext';
import CheckOut from './components/checkout/CheckOut';
import { CartContextProvider } from './contexts/CartContext';
import DropdownMenu from './nav/DropdownMenu';
import FleaMarketRoutes from './FleaMarketRoutes';
import FleaMarketProvider from './FleaMarketProvider';
import Modal from './components/shared/Modal';
import Login from './components/login/Login';
import auth from './utils/firebase/firebase';

import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material/styles';
import { useUser } from './hooks/useUser';
import UserContextModel from './models/UserContextModel';

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
  const [user, setUser] = useState(undefined);

  const handleSignOut = () => {
    auth.signOut().then(() => console.log('signed out'));
    localStorage.removeItem('user');
    localStorage.removeItem('access-token');
    setUser(new UserContextModel().signOut());
  };
  //Todo: add and remove administrator buttons based on user type
  const { loadUserContext, isUserInLocalStorage } = useUser();
  console.log('App component is rendering');
  const currentUser = loadUserContext();
  if (!user && isUserInLocalStorage()) {
    setUser(currentUser);
  }
  return (
    <div className="App">
      <button onClick={handleSignOut}>Sign out</button>
      <Router>
        <UserContext.Provider value={{ user, setUser }}>
          <FleaMarketProvider>
            <ThemeProvider theme={theme}>
              <Modal
                message="Please sign in"
                isOpen={user?.displayLogin}
                onClose={null}
              >
                <Login />
              </Modal>
              <NavBar title="Mark Tiahrt">
                <NavItem
                  isDropdown={true}
                  icon={<ProfileIcon name="profile" />}
                  imageURL={user?.photoURL}
                >
                  <DropdownMenu
                    dropdownProps={[
                      {
                        icon: <LoginOutIcon />,
                        url: '',
                        content: user?.isLoggedIn ? 'Sign Out' : 'Sign In',
                      },
                      {
                        icon: <ProfileIcon />,
                        url: '/profile',
                        content: 'User Profile',
                      },
                    ]}
                  ></DropdownMenu>
                </NavItem>
                <NavItem url={'#'} icon={<HomeIcon name="home" />}></NavItem>
                <NavItem
                  url={'CheckOut'}
                  icon={<ShoppingCartIcon name="shoppingCart" />}
                ></NavItem>
                <NavItem isDropdown={true} icon={<PlusIcon name="plus" />}>
                  <DropdownMenu
                    dropdownProps={[
                      {
                        icon: <SaleIcon />,
                        url: '/addItem',
                        content: 'Inventory Item',
                      },
                      {
                        icon: <CategoryIcon />,
                        url: '/editCategories',
                        content: 'Category',
                      },
                    ]}
                  />
                </NavItem>
              </NavBar>
              <CartContextProvider>
                <FleaMarketRoutes />
              </CartContextProvider>
            </ThemeProvider>
          </FleaMarketProvider>
        </UserContext.Provider>
      </Router>
    </div>
  );
}
export default App;
