import React, { useContext } from "react";
import Input from "../../shared/components/FormElement/Input";
import "./NewPlace.css";
import ImageUploader from "../../shared/components/FormElement/ImageUploader";
import { useForm } from "../../shared/Hooks/form-hook";
import { useHttpHook } from "../../shared/Hooks/http-hook";
import { AuthContext } from "../../shared/context/Auth-context";
import ModalError from "../../UIElement/ModalError/ModalError";
import { useHistory } from "react-router-dom";

function NewPlace(props) {
  const auth = useContext(AuthContext);
  const history = useHistory();

  const { isLoading, error, sendRequest, clearError } = useHttpHook();

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      image: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const placeSubmiteHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", formState.inputs.title.value);
    formData.append("description", formState.inputs.description.value);
    formData.append("address", formState.inputs.address.value);
    formData.append("image", formState.inputs.image.value);

    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/`,
        "POST",
        formData,
        {
          Authorization: "Bearer " + auth.token,
        }
      );

      history.push("/");
    } catch (error) {}
  };

  const closeErrorModal = () => {
    clearError();
    formState.inputs.image.value = "";
  };

  return (
    <React.Fragment>
      {error ? (
        <ModalError error={error} modalToggle={closeErrorModal} />
      ) : isLoading ? (
        "Loading..."
      ) : (
        <form className="form" onSubmit={placeSubmiteHandler}>
          <Input
            id="title"
            lable="Title"
            element="input"
            type="text"
            validators={[]}
            errorMsg={"Please insert a valid title"}
            onInput={inputHandler}
          />
          <Input
            id="address"
            lable="Address"
            element="input"
            type="text"
            validators={[]}
            errorMsg={"Please insert a valid address"}
            onInput={inputHandler}
          />
          <ImageUploader onInputs={inputHandler} id="image" />

          <Input
            id="description"
            lable="Description"
            element="textArea"
            type="text"
            validators={[]}
            errorMsg={"Please insert a valid Description"}
            onInput={inputHandler}
          />
          <button className="btn btn-primary">
            {/* disabled={!formState.isValid}> */}
            Add Place
          </button>
        </form>
      )}
    </React.Fragment>
  );
}

export default NewPlace;
