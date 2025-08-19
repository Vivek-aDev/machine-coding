import React, { useState } from "react";
import Column from "../components/Column";

const Board = () => {
  const [tasks, setTasks] = useState({
    "To Do": [],
    "In Progress": [],
    Done: [],
  });

  const handleAddTask = (column, task) => {
    setTasks((prev) => ({
      ...prev,
      [column]: [...prev[column], task],
    }));
  };
  return (
    <div className="board">
      {Object.keys(tasks).map((col) => (
        <Column
          key={col}
          title={col}
          tasks={tasks[col]}
          onAddTask={handleAddTask}
        />
      ))}
    </div>
  );
};

export default Board;
