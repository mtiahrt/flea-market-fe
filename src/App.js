import './App.css';
import ItemList from './components/ItemList';
import NavBar from './nav/NavBar';
import NavItem from './nav/NavItem';
import Login from './components/login/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Modal from './components/shared/Modal';

import Profile from './components/Profile';
import NavItemProfile from './nav/NavItemProfile';
import { ReactComponent as PlusIcon } from './icons/plus.svg';
import { ReactComponent as ShoppingCartIcon } from './icons/shopping-cart.svg';
import { ReactComponent as HomeIcon } from './icons/home.svg';
import { ReactComponent as FilterIcon } from './icons/filter-solid.svg';

import { useState } from 'react';
import { UserProfileContext } from './contexts/UserContext';
import DetailedItem from './components/DetailedItem';
import AddItem from './components/modify-items/AddItem';
import EditItem from './components/modify-items/EditItem';
import CheckOut from './components/checkout/CheckOut';
import { CartContextProvider } from './contexts/CartContext';

function App() {
  const [userProfile, setUserProfile] = useState({});
  console.log('App component is rendering');
  return (
    <div className="App">
      <Router>
        <UserProfileContext.Provider value={{ userProfile, setUserProfile }}>
          <NavBar>
            <NavItemProfile imgURL={userProfile.photoURL} />
            <NavItem url={''} icon={<HomeIcon />}></NavItem>
            <NavItem url={'CheckOut'} icon={<ShoppingCartIcon />}></NavItem>
            <NavItem url={'AddItem'} icon={<PlusIcon />}></NavItem>
            <NavItem url={'Filter'} icon={<FilterIcon />}></NavItem>
          </NavBar>
          <CartContextProvider>
            <Switch>
              <Route exact path="/">
                <header>
                  <h1>Wild Heather Shop</h1>
                </header>
                <ItemList />
                <Modal
                  message="Please sign in"
                  isOpen={
                    userProfile.isLoggedIn ? !userProfile.isLoggedIn : true
                  }
                  onClose={null}
                >
                  <Login />
                </Modal>
              </Route>
              <Route path="/Profile">
                <Profile userProfile={userProfile} />
              </Route>
              <Route
                path="/DetailedItem/:id"
                children={<DetailedItem />}
              ></Route>
              <Route path="/AddItem" children={<AddItem />}></Route>
              <Route path="/CheckOut" children={<CheckOut />}></Route>
              <Route path="/EditItem/:id" children={<EditItem />}></Route>
            </Switch>
          </CartContextProvider>
        </UserProfileContext.Provider>
      </Router>
    </div>
  );
}

export default App;
