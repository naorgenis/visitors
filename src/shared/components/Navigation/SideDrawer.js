import React from "react";
import Backdrop from "../../../UIElement/Backdrop/Backdrop";
import { CSSTransition } from "react-transition-group";
import "./SideDrawer.css";

function SideDrawer(props) {
  return (
    <Backdrop modalToggle={props.closeSideDrawer}>
      <CSSTransition
        in={props.show}
        timeout={200}
        classNames="slide-in-left"
        mountOnEnter
        unmountOnExit
      >
        <aside className="side-drawer">{props.children}</aside>
      </CSSTransition>
    </Backdrop>
  );
}

export default SideDrawer;
