import React from "react";
import PlaceItem from "./PlaceItem";
import { Link } from "react-router-dom";

function PlaceList(props) {
  if (props.places.length === 0 || !props.places)
    return (
      <div>
        <h3>You don't have any places to show</h3>
        <Link to="/places/new">
          <button className="btn btn-primary">Add Place</button>
        </Link>
      </div>
    );
  else
    return (
      <ul className="place-list">
        {props.places.map((place) => (
          <PlaceItem key={place.id} place={place} onDelete={props.onDelete} />
        ))}
      </ul>
    );
}

export default PlaceList;
