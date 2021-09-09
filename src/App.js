import "./App.css";
import ItemList from "./Components/ItemList";
import NavBar from "./Nav/NavBar";
import NavItem from "./Nav/NavItem";
import DropdownMenu from "./Nav/DropdownMenu";
import FacebookLogin from "./Components/Logins/Facebook";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Profile from './Components/Profile';
import Oauth from './Components/Logins/Oauth';
import NavItemProfile from "./Nav/NavItemProfile";
import { ReactComponent as MessengerIcon } from "./icons/messenger.svg";
import { ReactComponent as CaretIcon } from "./icons/caret.svg";
import { ReactComponent as PlusIcon } from "./icons/plus.svg";
import { useState } from "react";
import { UserProfileContext} from './Contexts/LoginContext';
import DetailedItem from "./Components/DetailedItem";

function App() {
  const [userProfile, setUserProfile] = useState({});

  return (
    <div className="App">
      <Router>
        <UserProfileContext.Provider value={{userProfile, setUserProfile}} >
          <NavBar>
            <NavItemProfile imgURL={userProfile.picture}/>
            <NavItem icon={<PlusIcon />}> </NavItem>
            <NavItem icon={<MessengerIcon />}></NavItem>
            <NavItem icon={<CaretIcon />}>
              <DropdownMenu></DropdownMenu>
            </NavItem>
          </NavBar>
      <FacebookLogin/>
          <Switch>
            <Route exact path="/">
              <header>
                <h1>Gretchenkelly Shop</h1>
              </header>
              <ItemList/>
              {/* {userProfile.isLoggedIn ? <ItemList/> : <Facebook/>} */}
            </Route>
            <Route path="/Profile">
              <Profile userProfile={userProfile}/>
            </Route>
            <Route path="/DetailedItem/:id" children={<DetailedItem/>}></Route>
            <Route path="/oauth">
              <Oauth/>
            </Route>
          </Switch>
        </UserProfileContext.Provider>
      </Router>
    </div>
  );
}
export default App;