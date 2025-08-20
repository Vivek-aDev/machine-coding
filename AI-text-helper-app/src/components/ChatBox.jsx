import React, { useState } from "react";

function ChatBox({ onSend, disabled }) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    const msg = input.trim();
    if (!msg || disabled) return;
    onSend(msg);
    setInput("");
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="composer">
      <input
        type="text"
        placeholder="Ask Gemini something..."
        className="composer-input"
        value={input}
        rows={1}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        disabled={disabled}
      />
      <button
        type="submit"
        className="composer-btn"
        onClick={handleSubmit}
        disabled={disabled || !input.trim()}
      >
        Send
      </button>
    </div>
  );
}

export default ChatBox;
