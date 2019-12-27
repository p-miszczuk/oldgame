import React from "react";

const Input = ({
  name,
  type,
  onChange,
  placeholder,
  value,
  style,
  autoComplete,
  score,
  finish
}) => (
  <>
    <p>
      <input
        name={name}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        style={style}
        autoComplete={autoComplete && "off"}
      />
    </p>
    <p>{finish && `Twój czas: ${score}`}</p>
  </>
);

export default Input;
