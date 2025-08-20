import React from "react";

const ChatMessage = ({ sender, text, typing }) => {
  const isUser = sender === "user";
  const avatar = isUser ? "🧑‍💻" : "🤖";
  return (
    <div className={`row ${isUser ? "row-right" : "row-left"}`}>
      {!isUser && <div className="avatar">{avatar}</div>}

      <div className={`bubble ${isUser ? "user" : "ai"}`}>
        {text}
        {typing && (
          <div className="typing-inline">
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </div>
        )}
        {isUser && <div className="avatar">{avatar}</div>}
      </div>
    </div>
  );
};

export default ChatMessage;
