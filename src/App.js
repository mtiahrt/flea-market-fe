import './App.css';
import ItemList from './Components/ItemList';
import NavBar from './Nav/NavBar';
import NavItem from './Nav/NavItem';
import DropdownMenu from './Nav/DropdownMenu';
import Oauths from './Components/Logins/Oauths';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Modal from './SharedComponents/Modal';

import Profile from './Components/Profile';
import OauthRedirect from './Components/Logins/OauthRedirect';
import NavItemProfile from './Nav/NavItemProfile';
import { ReactComponent as MessengerIcon } from './icons/messenger.svg';
import { ReactComponent as CaretIcon } from './icons/caret.svg';
import { ReactComponent as PlusIcon } from './icons/plus.svg';
import { useState } from 'react';
import { UserProfileContext } from './Contexts/LoginContext';
import DetailedItem from './Components/DetailedItem';
import AddItem from "./Components/AddItem";
import EditItem from './Components/EditItem';

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
            <NavItem url={"AddItem"} icon={<PlusIcon />}></NavItem>
            <NavItem icon={<MessengerIcon />}></NavItem>
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
