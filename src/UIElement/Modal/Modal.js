import React from "react";
import Backdrop from "../Backdrop/Backdrop";
import "./Modal.css";

function Modal(props) {
  console.log(props.address);
  return (
    <>
      <Backdrop modalToggle={props.modalToggle} />
      <div className="Modal">
        <header>{props.address}</header>
        <div className="modal-main-content">{props.children}</div>
        <button className="btn btn-danger" onClick={props.modalToggle}>
          close
        </button>
      </div>
    </>
  );
}

export default Modal;
