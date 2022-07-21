import React from "react";
import Part from "./Part";

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part) => {
        return (
          <li>
            <Part parts={part} />
          </li>
        );
      })}
    </div>
  );
};

export default Content;
