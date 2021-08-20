import React from "react";
import MainNavigation from "../shared/components/Navigation/MainNavigation";
import "./Layout.css";

function Layout(props) {
  return (
    <>
      <MainNavigation />
      <main className="layout">{props.children}</main>
    </>
  );
}

export default Layout;
