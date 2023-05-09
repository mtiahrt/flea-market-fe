import { Route, Switch } from 'react-router-dom';
import Inventory from './Components/Inventory';
import Modal from './Components/shared/Modal';
import Login from './Components/login/Login';
import DetailedItem from './Components/DetailedItem';
import AddItem from './Components/modify-items/AddItem';
import CheckOut from './Components/checkout/CheckOut';
import EditItem from './Components/modify-items/EditItem';
import EditCategories from './Components/modify-items/EditCategories';

const FleaMarketRoutes = ({ userProfile }) => {
  return (
    <Switch>
      <Route exact path="/">
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
