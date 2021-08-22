import React, { useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import ModalError from "../../UIElement/ModalError/ModalError";
import { useHttpHook } from "../../shared/Hooks/http-hook";

function Users(props) {
  const { isLoading, error, sendRequest, clearError } = useHttpHook();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users`
        );
        setLoadedUsers(response.users);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <React.Fragment>
      {error ? (
        <ModalError error={error} modalToggle={clearError} />
      ) : isLoading || !loadedUsers ? (
        "Loading..."
      ) : (
        <UsersList usersList={loadedUsers} />
      )}
    </React.Fragment>
  );
}

export default Users;
