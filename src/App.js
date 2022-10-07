import './App.css';
import ItemList from './Components/ItemList';
import NavBar from './nav/NavBar';
import NavItem from './nav/NavItem';
import DropdownMenu from './nav/DropdownMenu';
import Oauths from './Components/Logins/Oauths';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Modal from './SharedComponents/Modal';

import Profile from './Components/Profile';
import OauthRedirect from './Components/Logins/OauthRedirect';
import NavItemProfile from './nav/NavItemProfile';
import { ReactComponent as CaretIcon } from './icons/caret.svg';
import { ReactComponent as PlusIcon } from './icons/plus.svg';
import { ReactComponent as ShoppingCartIcon } from './icons/shopping-cart.svg';

import { useState } from 'react';
import { UserProfileContext } from './Contexts/LoginContext';
import DetailedItem from './Components/DetailedItem';
import AddItem from "./Components/ModifyItems/AddItem";
import EditItem from './Components/ModifyItems/EditItem';
import ShoppingCart from './Components/Checkout/ShoppingCart';
import CheckOut from './Components/Checkout/CheckOut';

function App() {
  const [userProfile, setUserProfile] = useState({});
  const [cartItems, setCartItems] = useState([]);
  console.log('App component is rendering');
  return (
    <div className='App'>
      <Router>
        <UserProfileContext.Provider value={{ userProfile, setUserProfile, cartItems, setCartItems }}>
          <NavBar>
            <NavItemProfile imgURL={userProfile.picture} />
            <NavItem url={"CheckOut"} icon={<ShoppingCartIcon />}></NavItem>
            <NavItem url={"AddItem"} icon={<PlusIcon />}></NavItem>
            <NavItem icon={<CaretIcon />}>
              <DropdownMenu></DropdownMenu>
            </NavItem>
          </NavBar>
          <Switch>
            <Route exact path='/'>
              <header>
                <h1>Gretchenkelly Shop</h1>
              </header>
              <ItemList />
              <Modal
                message='Please sign in'
                isOpen={userProfile.isLoggedIn ? !userProfile.isLoggedIn : true}
                onClose={null}>
                <Oauths />
              </Modal>
            </Route>
            <Route path='/Profile'>
              <Profile userProfile={userProfile} />
            </Route>
            <Route path='/DetailedItem/:id' children={<DetailedItem />}></Route>
            <Route path="/AddItem" children={<AddItem />}></Route>
            <Route path="/CheckOut" children={<CheckOut />}></Route>
            <Route path="/EditItem/:id" children={<EditItem />}></Route>
            <Route path='/oauth'>
              <OauthRedirect />
            </Route>
          </Switch>
        </UserProfileContext.Provider>
      </Router>
    </div>
  );
}

export default App;
