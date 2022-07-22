import React from "react";
import Input from "./Input";
import Button from "./Button";
import Header from "./Header";

const Filter = ({ value, onChange, onClick, button }) => {
  return (
    <div>
      <Header title="Phonebook" />
      <Input
        text="filter show with"
        value={value}
        id="search"
        onChange={onChange}
      />
      <Button onClick={onClick} text={button} />
    </div>
  );
};

export default Filter;
