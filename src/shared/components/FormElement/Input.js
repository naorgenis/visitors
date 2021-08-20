import React, { useEffect, useReducer } from "react";
import "./Input.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.value,
        isValid: true,
      };

    default:
      return state;
  }
};

function Input(props) {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isValid: props.initialValid || false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, onInput, isValid]);

  const onChangeHandler = (e) => {
    dispatch({ type: "CHANGE", value: e.target.value });
  };

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        className="form-control"
        onChange={onChangeHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        className="form-control"
        onChange={onChangeHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`form_control ${
        !inputState.isValid && "form_control_invalid"
      }`}
    >
      <span>{props.lable}</span>
      {element}
      {inputState.isValid ? null : <p>{props.errorMsg}</p>}
    </div>
  );
}

export default Input;
