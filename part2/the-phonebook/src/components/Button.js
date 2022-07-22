import React from "react";

const Button = ({ type, onClick, text }) => {
  return (
    <div>
      <button type={type} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default Button;
