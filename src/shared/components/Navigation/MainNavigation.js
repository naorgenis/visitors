import React, { useState } from "react";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import { Link } from "react-router-dom";
import SideDrawer from "./SideDrawer";
import "./MainNavigation.css";

function MainNavigation(props) {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

  const openDrawer = () => {
    setSideDrawerOpen(true);
  };

  const closeDrawer = () => {
    setSideDrawerOpen(false);
  };

  return (
    <React.Fragment>
      {sideDrawerOpen ? (
        <SideDrawer closeSideDrawer={closeDrawer} show={sideDrawerOpen}>
          <nav className="main-navigation__drawer-nav">
            <NavLinks />
          </nav>
        </SideDrawer>
      ) : null}
      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={openDrawer}>
          <span className="main-navigation__menu-btn span" />
          <span className="main-navigation__menu-btn span" />
          <span className="main-navigation__menu-btn span" />
        </button>
        <Link to="/">
          <h1 className="main-navigation__title">Your Places</h1>
        </Link>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
}

export default MainNavigation;
