import React from "react";
import Header from "./Header";
import Input from "./Input";
import Button from "./Button";

const Form = ({ valueName, valueNumber, onChange, onClick }) => {
  return (
    <div>
      <Header title="Add a new" />
      <form>
        <Input text="name:" value={valueName} id="name" onChange={onChange} />
        <Input
          text="number:"
          value={valueNumber}
          id="number"
          onChange={onChange}
        />
        <Button type="submit" onClick={onClick} text="add" />
      </form>
    </div>
  );
};

export default Form;
