import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../../UIElement/Modal/Modal";
import Map from "../../UIElement/Map/Map";
import ModalError from "../../UIElement/ModalError/ModalError";
import { AuthContext } from "../../shared/context/Auth-context";
import { useHttpHook } from "../../shared/Hooks/http-hook";
import "./PlaceItem.css";

function PlaceItem(props) {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpHook();
  const [showMap, setShowMap] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState(null);

  const toggleShowMap = () => {
    setShowMap(!showMap);
  };
  const toggleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };

  const deletePlace = async () => {
    try {
      toggleDeleteModal();
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/${props.place.id}`,
        "DELETE",
        {},
        { Authorization: "Bearer " + auth.token }
      );
      props.onDelete(props.place.id);
      setIsDeleted(response.message);
    } catch (error) {}
  };
  const toggleIsDeleted = () => {
    setIsDeleted(null);
  };

  return (
    <React.Fragment>
      {error ? (
        <ModalError error={error} modalToggle={clearError} />
      ) : (
        <li className="place-item">
          <div className="card" style={{ width: "25rem" }}>
            <img
              src={`${process.env.REACT_APP_ASSET_URL}/${props.place.image}`}
              className="card-img-top"
              alt={props.place.imageUrl}
            />
            <div className="card-body">
              <h5 className="card-title">{props.place.title}</h5>
              <p className="card-text">{props.place.address}</p>
              <p className="card-text">{props.place.description}</p>
              <button className="btn btn-primary" onClick={toggleShowMap}>
                Show On Map
              </button>
              {auth.userId === props.place.creator && (
                <Link to={`/places/${props.place.id}`}>
                  <button className="btn btn-warning">Edit Place</button>
                </Link>
              )}
              {auth.userId === props.place.creator && (
                <button className="btn btn-danger" onClick={toggleDeleteModal}>
                  Delete
                </button>
              )}
            </div>
          </div>
        </li>
      )}
      {deleteModal ? (
        <Modal modalToggle={toggleDeleteModal}>
          {isLoading ? (
            "Loading..."
          ) : (
            <div>
              <h4>Are you u want delete?</h4>
              <button className="btn btn-danger" onClick={deletePlace}>
                yes
              </button>
              <button className="btn btn-primary" onClick={toggleDeleteModal}>
                no
              </button>
            </div>
          )}
        </Modal>
      ) : null}
      {showMap ? (
        <Modal modalToggle={toggleShowMap} address={props.place.address}>
          <Map zoom={16} center={props.place.location} />
        </Modal>
      ) : null}
      {isDeleted ? (
        <Modal modalToggle={toggleIsDeleted}>
          <h4>{isDeleted}</h4>
        </Modal>
      ) : null}
    </React.Fragment>
  );
}

export default PlaceItem;
