import { Route, Switch } from 'react-router-dom';
import Inventory from './components/Inventory';
import DetailedItem from './components/DetailedItem';
import AddItem from './components/modify-items/AddItem';
import CheckOut from './components/checkout/CheckOut';
import EditItem from './components/modify-items/EditItem';
import EditCategories from './components/modify-items/EditCategories';
import UserProfile from './components/UserProfile';

const FleaMarketRoutes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Inventory />
      </Route>
      <Route path="/DetailedItem/:id" children={<DetailedItem />}></Route>
      <Route path="/AddItem" children={<AddItem />}></Route>
      <Route path="/CheckOut" children={<CheckOut />}></Route>
      <Route path="/EditItem/:id" children={<EditItem />}></Route>
      <Route path="/EditCategories" children={<EditCategories />}></Route>
      <Route path="/Profile" children={<UserProfile />}></Route>
    </Switch>
  );
};

export default FleaMarketRoutes;
