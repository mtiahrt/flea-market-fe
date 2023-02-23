import './App.css';
import NavBar from './nav/NavBar';
import NavItem from './nav/NavItem';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavItemProfile from './nav/NavItemProfile';
import { ReactComponent as PlusIcon } from './icons/plus.svg';
import { ReactComponent as ShoppingCartIcon } from './icons/shopping-cart.svg';
import { ReactComponent as HomeIcon } from './icons/home.svg';
import { ReactComponent as FilterIcon } from './icons/filter-solid.svg';

import { useState } from 'react';
import { UserProfileContext } from './contexts/UserContext';
import CheckOut from './components/checkout/CheckOut';
import { CartContextProvider } from './contexts/CartContext';
import DropdownMenu from './nav/DropdownMenu';
import FleaMarketRoutes from './FleaMarketRoutes';
import FleaMarketProvider from './FleaMarketProvider';
import { NavBarContext } from './contexts/NavBarContext';

function App() {
  const [userProfile, setUserProfile] = useState({});
  const [displayFilter, setDisplayFilter] = useState(false);
  console.log('App component is rendering');
  return (
    <div className="App">
      <Router>
        <UserProfileContext.Provider value={{ userProfile, setUserProfile }}>
          <NavBarContext.Provider value={{ displayFilter, setDisplayFilter }}>
            <FleaMarketProvider>
              <NavBar>
                <NavItemProfile imgURL={userProfile.photoURL} />
                <NavItem url={'#'} icon={<HomeIcon />}></NavItem>
                <NavItem url={'CheckOut'} icon={<ShoppingCartIcon />}></NavItem>
                <NavItem isDropdown={true} url={''} icon={<PlusIcon />}>
                  <DropdownMenu />
                </NavItem>
                <NavItem
                  clickHandler={() => setDisplayFilter(!displayFilter)}
                  url={'#'}
                  icon={<FilterIcon />}
                ></NavItem>
              </NavBar>
              <CartContextProvider>
                <FleaMarketRoutes userProfile={userProfile} />
              </CartContextProvider>
            </FleaMarketProvider>
          </NavBarContext.Provider>
        </UserProfileContext.Provider>
      </Router>
    </div>
  );
}

export default App;
