import React, { useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";

const Column = ({ title, tasks, onAddTask }) => {
  const [newTask, setNewTask] = useState("");

  const handleAdd = (e) => {
    // console.log("handle add executed");
    e.preventDefault();
    if (!newTask.trim()) return;
    onAddTask(title, newTask.trim());
    setNewTask("");
  };

  return (
    <div className="column">
      <h2>{title}</h2>

      {/* Add task form */}
      <form onSubmit={handleAdd} className="add-task-form">
        <input
          type="text"
          placeholder="Add a task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit">
          <MdAddCircleOutline />
        </button>
      </form>

      {/* Task list */}
      <div className="task-list">
        {tasks.map((task, index) => (
          <div key={index} className="task-card">
            {task}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Column;
