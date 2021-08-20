import React, { useContext, useState } from "react";
import Input from "../../shared/components/FormElement/Input";
import { useForm } from "../../shared/Hooks/form-hook";
import { AuthContext } from "../../shared/context/Auth-context";
import ModalError from "../../UIElement/ModalError/ModalError";
import { useHttpHook } from "../../shared/Hooks/http-hook";
import ImageUploader from "../../shared/components/FormElement/ImageUploader";

function Auth(props) {
  const { isLoading, error, sendRequest, clearError } = useHttpHook();

  const auth = useContext(AuthContext);
  const [loginMode, setLoginMode] = useState(true);

  const [stateForm, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchMoodHandler = () => {
    if (!loginMode) {
      setFormData(
        { ...stateForm.inputs, name: undefined, image: undefined },
        stateForm.inputs.password.isValid && stateForm.inputs.email.isValid
      );
    } else {
      setFormData(
        {
          ...stateForm.inputs,
          name: { value: "", isValid: true },
          image: { value: null, isValid: true },
        },
        false
      );
    }
    setLoginMode((prevLoginMode) => !prevLoginMode);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (loginMode) {
      console.log("login");
      try {
        console.log("try");

        const response = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/login`,
          "POST",
          JSON.stringify({
            password: stateForm.inputs.password.value,
            email: stateForm.inputs.email.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        console.log(response);

        auth.login(response.userId, response.token);
      } catch (err) {}
    } else {
      try {
        const formData = new FormData();
        formData.append("email", stateForm.inputs.email.value);
        formData.append("name", stateForm.inputs.name.value);
        formData.append("password", stateForm.inputs.password.value);
        formData.append("image", stateForm.inputs.image.value);

        console.log(formData);
        const response = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
          "POST",
          formData
        );
        auth.login(response.userId, response.token);
      } catch (err) {}
    }
  };

  return (
    <React.Fragment>
      {error ? (
        <ModalError error={error} modalToggle={clearError} />
      ) : (
        <div>
          {isLoading ?? "Loading..."}
          <form onSubmit={onSubmitHandler}>
            {!loginMode && (
              <Input
                id="name"
                lable="User Name"
                element="input"
                type="text"
                validators={[]}
                errorMsg={"Please insert a valid user name"}
                onInput={inputHandler}
              />
            )}
            <Input
              id="email"
              lable="Email"
              element="input"
              type="text"
              validators={[]}
              errorMsg={"Please insert a valid email"}
              onInput={inputHandler}
            />
            <Input
              id="password"
              lable="Password"
              element="input"
              type="password"
              validators={[]}
              errorMsg={"Please insert a valid password"}
              onInput={inputHandler}
            />
            {!loginMode && <ImageUploader onInputs={inputHandler} id="image" />}
            <button className="btn btn-primary">
              {loginMode ? "LOGIN" : "SIGNUP"}
            </button>
          </form>
          <button className="btn btn-warning" onClick={switchMoodHandler}>
            Switch to {!loginMode ? "LOGIN" : "SIGN-UP"}
          </button>
        </div>
      )}
    </React.Fragment>
  );
}

export default Auth;
