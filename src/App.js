import "./App.css";
import ItemList from "./Components/ItemList";
import NavBar from "./Nav/NavBar";
import NavItem from "./Nav/NavItem";
import DropdownMenu from "./Nav/DropdownMenu";
import Facebook from "./Components/Logins/Facebook";

import { ReactComponent as BellIcon } from "./icons/bell.svg";
import { ReactComponent as MessengerIcon } from "./icons/messenger.svg";
import { ReactComponent as CaretIcon } from "./icons/caret.svg";
import { ReactComponent as PlusIcon } from "./icons/plus.svg";
import { useState } from "react";
import { LoginContext} from './Contexts/LoginContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="App">
      <NavBar>
        <NavItem icon={<BellIcon />}></NavItem>
        <NavItem icon={<PlusIcon />}> </NavItem>
        <NavItem icon={<MessengerIcon />}> </NavItem>
        <NavItem icon={<CaretIcon />}>
          <DropdownMenu></DropdownMenu>
        </NavItem>
      </NavBar>
      <header>
        <h1>gretchenkelly shop</h1>
      </header>
      <LoginContext.Provider value={setIsLoggedIn} >
        {isLoggedIn ? <ItemList/> : <Facebook/>}
      </LoginContext.Provider>
    </div>
  );
}
export default App;
