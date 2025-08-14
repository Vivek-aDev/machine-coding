import React from "react";
import Column from "../components/Column";

const Board = () => {
  return (
    <div className="board">
      <Column title="To-Do" />
      <Column title="In Progress" />
      <Column title="Done" />
    </div>
  );
};

export default Board;
