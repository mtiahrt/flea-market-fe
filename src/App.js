import './App.css';
import NavBar from './nav/NavBar';
import { BrowserRouter as Router } from 'react-router-dom';
import React, { useState } from 'react';
import { UserContext } from './contexts/UserContext';
import { CartContextProvider } from './contexts/CartContext';
import FleaMarketRoutes from './FleaMarketRoutes';
import FleaMarketProvider from './FleaMarketProvider';
import Modal from './components/shared/Modal';
import Login from './components/login/Login';

import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material/styles';
import { useUser } from './hooks/useUser';

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
  //Todo: add and remove administrator buttons based on user type
  const { loadUserContext, isUserInLocalStorage } = useUser();
  console.log('App component is rendering');
  const currentUser = loadUserContext();
  if (!user?.isLoggedIn && isUserInLocalStorage()) {
    setUser(currentUser);
  }
  return (
    <div className="App">
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
              <NavBar></NavBar>
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
