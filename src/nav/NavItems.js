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
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as HamburgerIcon } from '../icons/menu-hamburger.svg';
import SlideDrawer from '../slideDrawer/SlideDrawer';
import Backdrop from '../slideDrawer/Backdrop';

function NavItems() {
  const { user, setUser } = useContext(UserContext);
  const [active, setActive] = useState('home');
  const [drawerOpen, setDrawerOpen] = useState(false);

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

  const handleHamburgerClick = (e) => {
    setActive((prev) => (prev === 'hamburger' ? '' : 'hamburger'));
    setDrawerOpen((prev) => !prev);
  };

  return (
    <>
      <SlideDrawer toggle={handleHamburgerClick} show={drawerOpen} />
      {drawerOpen && <Backdrop close={handleHamburgerClick} />}
      <button
        style={{
          marginRight: 'auto',
          background: 'transparent',
          border: 'none',
        }}
        data-state={drawerOpen ? 'opened' : 'closed'}
        aria-expanded={drawerOpen ? 'true' : 'false'}
        onClick={handleHamburgerClick}
        className="button-hamburger"
      >
        <HamburgerIcon />
      </button>
      <StyledLiTitle>
        <Link to={'/#'}>
          <StyledH1>Upcycled Treasures</StyledH1>
        </Link>
      </StyledLiTitle>
      <NavItem
        className="profile-button"
        isActive={active}
        setActive={setActive}
        isDropdown={true}
        icon={
          <ProfileIcon
            className={drawerOpen ? 'drawer-open' : null}
            name="profile"
          />
        }
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
        isDrawerOpen={drawerOpen}
        isActive={active}
        setActive={setActive}
        url={'CheckOut'}
        icon={
          <ShoppingCartIcon
            className={drawerOpen ? 'drawer-open' : null}
            name="shoppingCart"
          />
        }
      ></NavItem>
      <NavItem
        isDrawerOpen={drawerOpen}
        isActive={active}
        setActive={setActive}
        isDropdown={true}
        icon={
          <PlusIcon className={drawerOpen ? 'drawer-open' : null} name="plus" />
        }
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
const StyledH1 = styled.h1`
  font-size: var(--font-size-5);
  color: var(--logo-fill-color);
`;
const StyledLiTitle = styled.li`
  flex-grow: 0.4;
`;
export default NavItems;
