import React from "react";

const BookItem = ({ book, onToggleRead, onDelete }) => {
  const { id, title, author, isRead } = book;
  return (
    <>
      <li
        key={id}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.5rem",
          border: "1px solid #ccc",
          padding: "0.5rem",
          borderRadius: "5px",
        }}
      >
        <div>
          <strong>{title}</strong> by {author} -{" "}
          {isRead ? "✅ Read" : "❌ Unread"}
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          <button onClick={() => onToggleRead(id)}>
            {!isRead ? "Read 👍🏻" : "unread 👎🏻"}
          </button>
          <button onClick={() => onDelete(id)}>Delete</button>
        </div>
      </li>
    </>
  );
};

export default BookItem;
