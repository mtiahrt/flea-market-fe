import "./App.css";
import ItemList from "./Components/ItemList";
import NavBar from "./Nav/NavBar";
import NavItem from "./Nav/NavItem";
import DropdownMenu from "./Nav/DropdownMenu";
import NewItemList from "./Components/NewItemList";
import Facebook from "./Components/Logins/Facebook";

import { ReactComponent as BellIcon } from "./icons/bell.svg";
import { ReactComponent as MessengerIcon } from "./icons/messenger.svg";
import { ReactComponent as CaretIcon } from "./icons/caret.svg";
import { ReactComponent as PlusIcon } from "./icons/plus.svg";

function App() {
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
        <Facebook/>
      </header>
      <NewItemList />
      <ItemList></ItemList>
    </div>
  );
}
export default App;
