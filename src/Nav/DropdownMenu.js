import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { ReactComponent as CogIcon } from "../icons/cog.svg";
import { ReactComponent as ChevronIcon } from "../icons/chevron.svg";
import { ReactComponent as ArrowIcon } from "../icons/arrow.svg";
import { ReactComponent as BoltIcon } from "../icons/bolt.svg";
import { CSSTransition } from "react-transition-group";

const DropdownMenu = () => {
  const [activeMenu, setActiveMenu] = useState(""); //for setting what menu to show
  const [menuHeight, setMenuHeight] = useState(0); // state for the menu height
  const dropdownRef = useRef(null);

  useLayoutEffect(() => {
    setActiveMenu("main");
    return () => {
      console.log(activeMenu);
      setActiveMenu("");
      setMenuHeight(0);
    };
  }, []);

  function calcHeight(ele) {
    const height = ele.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a
        href="#"
        className="menu-item"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }
  return (
    <div
      className="dropdown"
      style={{ height: menuHeight, zIndex: 1 }}
      ref={dropdownRef}
    >
      <CSSTransition
        in={activeMenu === "main"}
        unmountOnExit
        timeout={500}
        classNames="menu-primary"
        onEnter={calcHeight}
        onExit={calcHeight}
      >
        <div className="menu">
          <DropdownItem leftIcon={<BoltIcon />}>My Profile</DropdownItem>
          <DropdownItem
            leftIcon={<CogIcon />}
            rightIcon={<ChevronIcon />}
            goToMenu="clothingApperal"
          >
            Clothing & Apperal
          </DropdownItem>
          <DropdownItem
            leftIcon="🦧"
            rightIcon={<ChevronIcon />}
            goToMenu="animals"
          >
            Animals
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "clothingApperal"}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem leftIcon={<ArrowIcon />} goToMenu="main">
            <h2>Clothing & Apperal</h2>
          </DropdownItem>
          <DropdownItem leftIcon="👕">Womans Shirts</DropdownItem>
          <DropdownItem leftIcon="👖">Womans Jeans</DropdownItem>
          <DropdownItem leftIcon="👗">Womans Dress</DropdownItem>
          <DropdownItem leftIcon="🥿">Womans Shoes</DropdownItem>
          <DropdownItem leftIcon="🧦">Womans Socks</DropdownItem>
          <DropdownItem leftIcon="👒">Womans Hats</DropdownItem>
          <DropdownItem leftIcon="📿">Womans Necklaces</DropdownItem>
          <DropdownItem leftIcon="⌚">Womans Watches</DropdownItem>
          <DropdownItem leftIcon="💎">Womans Jewelry</DropdownItem>
        </div>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === "animals"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>Animals</h2>
          </DropdownItem>
          <DropdownItem leftIcon="🦘">Kangaroo</DropdownItem>
          <DropdownItem leftIcon="🐸">Frog</DropdownItem>
          <DropdownItem leftIcon="🦋">Horse?</DropdownItem>
          <DropdownItem leftIcon="🦔">Hedgehog</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
};

export default DropdownMenu;
