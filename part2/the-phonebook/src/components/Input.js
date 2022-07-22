import React from "react";

const Input = ({ text, value, id, onChange }) => {
  return (
    <div>
      {text}
      <input value={value} id={id} onChange={onChange} />
    </div>
  );
};

export default Input;
