import React, { useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  applyNodeChanges,
  applyEdgeChanges,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const columnWidth = 300;
const columnHeight = 500;
const taskSpacing = 90; // ✅ vertical spacing between tasks

// ✅ Custom Column Node with header
function ColumnNode({ data }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        border: "1px solid #ccc",
        borderRadius: "8px",
        background: data.bg || "#f8f9fa",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "8px",
          fontWeight: "bold",
          borderBottom: "1px solid #ccc",
          background: "#fff",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          textAlign: "center",
        }}
      >
        {data.label}
      </div>
    </div>
  );
}

// ✅ Custom Task Node styled like a Kanban card
function TaskNode({ data }) {
  return (
    <div
      style={{
        padding: "10px",
        margin: "5px",
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        fontSize: "14px",
        fontWeight: "500",
        cursor: "grab",
      }}
    >
      {data.label}
    </div>
  );
}

export default function Board() {
  const initialNodes = [
    // Columns
    {
      id: "todo",
      type: "columnNode",
      position: { x: 0, y: 0 },
      style: { width: columnWidth, height: columnHeight },
      data: { label: "To Do", bg: "#f8f9fa" },
    },
    {
      id: "in-progress",
      type: "columnNode",
      position: { x: columnWidth + 50, y: 0 },
      style: { width: columnWidth, height: columnHeight },
      data: { label: "In Progress", bg: "#fff3cd" },
    },
    {
      id: "done",
      type: "columnNode",
      position: { x: 2 * (columnWidth + 50), y: 0 },
      style: { width: columnWidth, height: columnHeight },
      data: { label: "Done", bg: "#d4edda" },
    },

    // Example task
    {
      id: "task-1",
      type: "taskNode", // ✅ custom card node
      position: { x: 20, y: 60 },
      parentNode: "todo",
      data: { label: "Setup project" },
    },
  ];

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");

  const onNodesChange = (changes) =>
    setNodes((nds) => applyNodeChanges(changes, nds));
  const onEdgesChange = (changes) =>
    setEdges((eds) => applyEdgeChanges(changes, eds));

  // ✅ Find which column is under a dragged node
  const getColumnIdAtPosition = (pos) => {
    for (let node of nodes) {
      if (node.type === "columnNode") {
        const { x, y } = node.position;
        const { width, height } = node.style;
        if (
          pos.x >= x &&
          pos.x <= x + width &&
          pos.y >= y &&
          pos.y <= y + height
        ) {
          return node.id;
        }
      }
    }
    return null;
  };

  // ✅ Reposition tasks dynamically when dragging
  const onNodeDragStop = (event, draggedNode) => {
    const newParent = getColumnIdAtPosition(draggedNode.position);

    if (newParent && newParent !== draggedNode.parentNode) {
      // Count tasks already inside the new column
      const tasksInColumn = nodes.filter(
        (n) => n.parentNode === newParent && n.type === "taskNode"
      );

      setNodes((nds) =>
        nds.map((n) =>
          n.id === draggedNode.id
            ? {
                ...n,
                parentNode: newParent,
                position: { x: 20, y: 60 + tasksInColumn.length * taskSpacing },
              }
            : n
        )
      );
    }
  };

  // ✅ Add new task below existing tasks
  const addTask = () => {
    if (!taskTitle.trim()) return;

    const tasksInTodo = nodes.filter(
      (n) => n.parentNode === "todo" && n.type === "taskNode"
    );

    const newTask = {
      id: `task-${Date.now()}`,
      type: "taskNode",
      position: { x: 20, y: 60 + tasksInTodo.length * taskSpacing },
      parentNode: "todo",
      data: { label: taskTitle },
    };

    setNodes((nds) => [...nds, newTask]);
    setTaskTitle("");
  };

  return (
    <div style={{ padding: "1rem" }}>
      {/* ✅ Input bar */}
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Enter new task..."
          style={{
            padding: "0.5rem",
            width: "250px",
            marginRight: "0.5rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={addTask}
          style={{
            padding: "0.5rem 1rem",
            cursor: "pointer",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
          }}
        >
          Add Task
        </button>
      </div>

      {/* ✅ Kanban board */}
      <div style={{ width: "100%", height: "80vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeDragStop={onNodeDragStop}
          fitView
          nodeTypes={{ columnNode: ColumnNode, taskNode: TaskNode }}
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
}
