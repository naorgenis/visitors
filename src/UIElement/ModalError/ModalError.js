import React from "react";
import Modal from "../Modal/Modal";

function ModalError(props) {
  return (
    <Modal modalToggle={props.modalToggle}>
      <div>{props.error}</div>
    </Modal>
  );
}

export default ModalError;
