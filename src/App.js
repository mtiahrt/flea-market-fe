import './App.css';
import ItemList from './Components/ItemList';
import NavBar from './nav/NavBar';
import NavItem from './nav/NavItem';
import DropdownMenu from './nav/DropdownMenu';
import Login from './Components/Logins/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Modal from './SharedComponents/Modal';

import Profile from './Components/Profile';
import NavItemProfile from './nav/NavItemProfile';
import { ReactComponent as CaretIcon } from './icons/caret.svg';
import { ReactComponent as PlusIcon } from './icons/plus.svg';
import { ReactComponent as ShoppingCartIcon } from './icons/shopping-cart.svg';
import { ReactComponent as HomeIcon } from './icons/home.svg';
import { useState } from 'react';
import { UserProfileContext } from './Contexts/LoginContext';
import DetailedItem from './Components/DetailedItem';
import AddItem from './Components/ModifyItems/AddItem';
import EditItem from './Components/ModifyItems/EditItem';
import CheckOut from './Components/Checkout/CheckOut';

function App() {
  const [userProfile, setUserProfile] = useState({});
  const [cartItems, setCartItems] = useState([]);
  console.log('App component is rendering');
  return (
    <div className="App">
      <Router>
        <UserProfileContext.Provider
          value={{ userProfile, setUserProfile, cartItems, setCartItems }}
        >
          <NavBar>
            <NavItemProfile imgURL={userProfile.photoURL} />
            <NavItem url={''} icon={<HomeIcon />}></NavItem>
            <NavItem url={'CheckOut'} icon={<ShoppingCartIcon />}></NavItem>
            <NavItem url={'AddItem'} icon={<PlusIcon />}></NavItem>
            <NavItem icon={<CaretIcon />}>
              <DropdownMenu></DropdownMenu>
            </NavItem>
          </NavBar>
          <Switch>
            <Route exact path="/">
              <header>
                <h1>Wild Heather Shop</h1>
              </header>
              <ItemList />
              <Modal
                message="Please sign in"
                isOpen={userProfile.isLoggedIn ? !userProfile.isLoggedIn : true}
                onClose={null}
              >
                <Login />
              </Modal>
            </Route>
            <Route path="/Profile">
              <Profile userProfile={userProfile} />
            </Route>
            <Route path="/DetailedItem/:id" children={<DetailedItem />}></Route>
            <Route path="/AddItem" children={<AddItem />}></Route>
            <Route path="/CheckOut" children={<CheckOut />}></Route>
            <Route path="/EditItem/:id" children={<EditItem />}></Route>
          </Switch>
        </UserProfileContext.Provider>
      </Router>
    </div>
  );
}

export default App;
