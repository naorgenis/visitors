import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import PlaceList from "../components/PlaceList";
import { useHttpHook } from "../../shared/Hooks/http-hook";
import ModalError from "../../UIElement/ModalError/ModalError";

function UserPlaces(props) {
  const history = useHistory();
  const { isLoading, error, sendRequest, clearError } = useHttpHook();
  const userId = useParams().userId;
  const [placeList, setPlaceList] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
        );
        setPlaceList(response.userPlaces);
      } catch (err) {}
    };

    fetchData();
  }, [sendRequest, userId]);

  const onDeletedPlace = (placeId) => {
    setPlaceList(placeList.filter((place) => place.id !== placeId));
  };

  const closeModalError = () => {
    clearError();
    history.push("/");
  };

  return (
    <React.Fragment>
      {error ? (
        <ModalError error={error} modalToggle={closeModalError} />
      ) : isLoading || !placeList ? (
        "Loading..."
      ) : (
        <PlaceList places={placeList} onDelete={onDeletedPlace} />
      )}
    </React.Fragment>
  );
}

export default UserPlaces;
