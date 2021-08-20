import React from "react";
import "./Backdrop.css";

function Backdrop(props) {
  return (
    <div className="Backdrop" onClick={props.modalToggle}>
      {props.children}
    </div>
  );
}

export default Backdrop;
