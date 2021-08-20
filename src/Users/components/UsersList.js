import React from "react";
import User from "./User";
import "./UsersList.css";

function UsersList(props) {
  if (props.usersList.length === 0) {
    return <h1>Users not found!</h1>;
  } else {
    return (
      <ul className="userList">
        {props.usersList.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </ul>
    );
  }
}

export default UsersList;
