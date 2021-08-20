import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Input from "../../shared/components/FormElement/Input";
import { useForm } from "../../shared/Hooks/form-hook";
import { useHttpHook } from "../../shared/Hooks/http-hook";
import ModalError from "../../UIElement/ModalError/ModalError";
import { AuthContext } from "../../shared/context/Auth-context";

function UpdatePlace(props) {
  const { isLoading, error, sendRequest, clearError } = useHttpHook();
  const auth = useContext(AuthContext);
  const history = useHistory();
  const placeId = useParams().placeId;
  const [place, setPlace] = useState(null);

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`
        );
        setPlace(response.place);
        setFormData(
          {
            title: {
              value: response.place.title,
              isValid: true,
            },
            description: {
              value: response.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (error) {}
    };
    fetchData();
  }, [sendRequest, placeId, setFormData]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`,
        "PATCH",

        JSON.stringify({
          description: formState.inputs.description.value,
          title: formState.inputs.title.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      setPlace(response.place);
      history.push(`/${auth.userId}/places`);
    } catch (error) {}
  };

  if (!place) return <h2>place not found</h2>;

  return (
    <React.Fragment>
      <div>
        <h2>Update Place</h2>
        {error ? (
          <ModalError error={error} modalToggle={clearError} />
        ) : isLoading || !formState.isValid ? (
          "Loading...."
        ) : (
          <form onSubmit={onSubmitHandler}>
            <Input
              id="title"
              lable="title"
              element="input"
              type="text"
              validators={[]}
              errorMsg="Please insert a valid title"
              onInput={inputHandler}
              initialValue={formState.inputs.title.value}
              initialValid={formState.inputs.title.isValid}
            />
            <Input
              id="description"
              lable="description"
              element="textArea"
              validators={[]}
              errorMsg="Please insert a valid Description"
              onInput={inputHandler}
              initialValue={formState.inputs.description.value}
              initialValid={formState.inputs.description.isValid}
            />
            <button className="btn btn-primary">save change</button>
          </form>
        )}
      </div>
    </React.Fragment>
  );
}

export default UpdatePlace;
