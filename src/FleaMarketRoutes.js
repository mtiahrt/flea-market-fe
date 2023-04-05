import { Route, Switch } from 'react-router-dom';
import Inventory from './components/Inventory';
import Modal from './components/shared/Modal';
import Login from './components/login/Login';
import Profile from './components/Profile';
import DetailedItem from './components/DetailedItem';
import AddItem from './components/modify-items/AddItem';
import CheckOut from './components/checkout/CheckOut';
import EditItem from './components/modify-items/EditItem';
import EditCategories from './components/modify-items/EditCategories';

const FleaMarketRoutes = ({ userProfile }) => {
  return (
    <Switch>
      <Route exact path="/">
        <header>
          <h1>Wild Heather Shop</h1>
        </header>
        <Inventory />
        <Modal
          message="Please sign in"
          isOpen={userProfile.isLoggedIn ? !userProfile.isLoggedIn : true}
          onClose={null}
        >
          <Login />
        </Modal>
      </Route>
      <Route path="/DetailedItem/:id" children={<DetailedItem />}></Route>
      <Route path="/AddItem" children={<AddItem />}></Route>
      <Route path="/CheckOut" children={<CheckOut />}></Route>
      <Route path="/EditItem/:id" children={<EditItem />}></Route>
      <Route path="/EditCategories" children={<EditCategories />}></Route>
    </Switch>
  );
};

export default FleaMarketRoutes;
