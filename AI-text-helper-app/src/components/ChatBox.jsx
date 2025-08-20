import React, { useState } from "react";

function ChatBox({ onSend }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask Gemini something..."
        style={styles.input}
      />
      <button type="submit" style={styles.button}>Send</button>
    </form>
  );
}

const styles = {
  form: { display: "flex", gap: "0.5rem", marginTop: "1rem" },
  input: { flex: 1, padding: "0.5rem", fontSize: "1rem" },
  button: { padding: "0.5rem 1rem", cursor: "pointer" },
};

export default ChatBox;
