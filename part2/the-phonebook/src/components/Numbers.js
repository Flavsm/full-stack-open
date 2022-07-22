import React from "react";
import Header from "./Header";

const Numbers = ({ display }) => {
  return (
    <div>
      <Header title="Numbers" />
      {display}
    </div>
  );
};

export default Numbers;
