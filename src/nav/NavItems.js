import React, { useContext, useState } from 'react';
import NavItem from './NavItem';
import DropdownMenu from './DropdownMenu';
import auth from '../utils/firebase/firebase';
import UserContextModel from '../models/UserContextModel';
import { ReactComponent as LoginIcon } from '../icons/login.svg';
import { ReactComponent as LogoutIcon } from '../icons/logout.svg';
import { ReactComponent as ShoppingCartIcon } from '../icons/shopping-cart.svg';
import { ReactComponent as PlusIcon } from '../icons/plus.svg';
import { ReactComponent as SaleIcon } from '../icons/sale-svgrepo-com.svg';
import { ReactComponent as CategoryIcon } from '../icons/category-svgrepo-com.svg';
import { ReactComponent as ProfileIcon } from '../icons/profile.svg';
import { UserContext } from '../contexts/UserContext';

function NavItems() {
  const { user, setUser } = useContext(UserContext);
  const [active, setActive] = useState('home');

  const logUserOut = () => {
    auth.signOut().then(() => console.log('signed out'));
    localStorage.removeItem('user');
    localStorage.removeItem('access-token');
    setUser(new UserContextModel().signOut());
  };
  const logUserIn = () => {
    if (!user?.isLoggedIn) {
      setUser({ ...user, displayLogin: true });
      return;
    }
  };
  return (
    <>
      <NavItem
        className="profile-button"
        isActive={active}
        setActive={setActive}
        isDropdown={true}
        icon={<ProfileIcon name="profile" />}
        imageURL={user?.photoURL}
      >
        <DropdownMenu
          dropdownProps={[
            {
              icon: user?.isLoggedIn ? <LogoutIcon /> : <LoginIcon />,
              url: '',
              content: user?.isLoggedIn ? 'Sign Out' : 'Sign In',
              onClickEventHandler: user?.isLoggedIn ? logUserOut : logUserIn,
            },
            {
              icon: <ProfileIcon />,
              url: '/profile',
              content: 'User Profile',
              onClickEventHandler: () => console.log('you clicked profile'),
            },
          ]}
        ></DropdownMenu>
      </NavItem>
      <NavItem
        isActive={active}
        setActive={setActive}
        url={'CheckOut'}
        icon={<ShoppingCartIcon name="shoppingCart" />}
      ></NavItem>
      <NavItem
        isActive={active}
        setActive={setActive}
        isDropdown={true}
        icon={<PlusIcon name="plus" />}
      >
        <DropdownMenu
          dropdownProps={[
            {
              icon: <SaleIcon />,
              url: '/addItem',
              content: 'Inventory Item',
            },
            {
              icon: <CategoryIcon />,
              url: '/editCategories',
              content: 'Category',
            },
          ]}
        />
      </NavItem>
    </>
  );
}

export default NavItems;
