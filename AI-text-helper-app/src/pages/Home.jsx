import React, { useState } from "react";
import ChatBox from "../components/ChatBox";

const Home = () => {
  const [messages, setMessages] = useState([]);

  const handleSend = (userMessage) => {
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    // Later: call AI API here
  };

  return (
    <div>
      <h1>AI Text Helper</h1>

      <div className="message-container">
        {messages.map((msg, index) => (
          <p key={index}>
            <b>{msg.sender}</b> {msg.text}
          </p>
        ))}
      </div>

      <ChatBox onSend={handleSend} />
    </div>
  );
};

export default Home;
