import React, { useContext, useState } from 'react';
import NavItem from './NavItem';
import { ReactComponent as ProfileIcon } from '../icons/profile.svg';
import DropdownMenu from './DropdownMenu';
import { ReactComponent as LoginOutIcon } from '../icons/login-out.svg';
import { ReactComponent as HomeIcon } from '../icons/home.svg';
import { ReactComponent as ShoppingCartIcon } from '../icons/shopping-cart.svg';
import { ReactComponent as PlusIcon } from '../icons/plus.svg';
import { ReactComponent as SaleIcon } from '../icons/sale-svgrepo-com.svg';
import { ReactComponent as CategoryIcon } from '../icons/category-svgrepo-com.svg';
import { UserContext } from '../contexts/UserContext';

function NavItems(props) {
  const { user } = useContext(UserContext);
  const [active, setActive] = useState('home');
  return (
    <>
      <NavItem
        isActive={active}
        setActive={setActive}
        isDropdown={true}
        icon={<ProfileIcon name="profile" />}
        imageURL={user?.photoURL}
      >
        <DropdownMenu
          dropdownProps={[
            {
              icon: <LoginOutIcon />,
              url: '',
              content: user?.isLoggedIn ? 'Sign Out' : 'Sign In',
              onClickEventHandler: () => console.log('you clicked Logout'),
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
        url={'#'}
        icon={<HomeIcon name="home" />}
      ></NavItem>
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
