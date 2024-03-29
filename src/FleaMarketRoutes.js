import { Route, Switch } from 'react-router-dom';
import Inventory from './components/Inventory';
import DetailedItem from './components/DetailedItem';
import AddItem from './components/modify-items/AddItem';
import CheckOut from './components/checkout/CheckOut';
import EditItem from './components/modify-items/EditItem';
import EditCategories from './components/modify-items/EditCategories';
import UserProfile from './components/UserProfile';
import Home from './components/Home';

const FleaMarketRoutes = () => {
  return (
    <Switch>
      <Route path="/" exact={true} children={<Home />}></Route>
      <Route exact path="/">
        <Inventory />
      </Route>
      <Route path="/inventory/category/" children={<Inventory />}></Route>
      <Route path="/inventory/subcategory/" children={<Inventory />}></Route>
      <Route
        path="/inventory/detailedItem/:id"
        children={<DetailedItem />}
      ></Route>
      <Route path="/addItem" children={<AddItem />}></Route>
      <Route path="/checkOut" children={<CheckOut />}></Route>
      <Route path="/editItem/:id" children={<EditItem />}></Route>
      <Route path="/editCategories" children={<EditCategories />}></Route>
      <Route path="/profile" children={<UserProfile />}></Route>
    </Switch>
  );
};

export default FleaMarketRoutes;
