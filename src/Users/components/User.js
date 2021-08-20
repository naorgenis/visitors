import React from "react";
import { Link } from "react-router-dom";
import "./User.css";

function User(props) {
  return (
    <div className="card mb-3" style={{ maxWidth: "540px" }}>
      <Link to={`/${props.user.id}/places`}>
        <div className="row g-0">
          <div className="col-md-3">
            <img
              src={`${process.env.REACT_APP_ASSET_URL}/${props.user.image}`}
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-9">
            <div className="card-body">
              <h5 className="card-title">{props.user.name}</h5>
              <p className="card-text">{props.user.places.length}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default User;
