import React from "react";

const Button = ({ text, onClick, style, className, type }) => (
  <button onClick={onClick} className={className} style={style} type={type}>
    {text}
  </button>
);

export default Button;
