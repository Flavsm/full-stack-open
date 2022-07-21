import React from "react";

const Total = ({ course }) => {
  let sum = course.parts.map((e) => e.exercises).reduce((acc, c) => acc + c, 0);

  return <h3>total of {sum} exercises</h3>;
};

export default Total;
