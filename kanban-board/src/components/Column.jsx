import React from "react";

const Column = ({ title, children }) => {
  return (
    <div className="column">
      <h2>{title}</h2>
      <div className="task-list">{children}</div>
    </div>
  );
};

export default Column;
