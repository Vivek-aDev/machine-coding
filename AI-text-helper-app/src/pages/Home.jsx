import React, { useState } from "react";
import { getAIResponse } from "../utils/api";
import ChatBox from "../components/ChatBox";

function Home() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (userMessage) => {

    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setLoading(true);


    const aiText = await getAIResponse(userMessage);


    setMessages((prev) => [...prev, { sender: "ai", text: aiText }]);
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1>🤖 Gemini AI Chat</h1>

      <div style={styles.chatWindow}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              ...styles.message,
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              background: msg.sender === "user" ? "#007bff" : "#e0e0e0",
              color: msg.sender === "user" ? "white" : "black",
            }}
          >
            {msg.text}
          </div>
        ))}
        {loading && <p>⌛ Gemini is thinking...</p>}
      </div>

      <ChatBox onSend={handleSend} />
    </div>
  );
}

const styles = {
  container: { maxWidth: "600px", margin: "0 auto", padding: "2rem" },
  chatWindow: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "1rem",
    minHeight: "300px",
    overflowY: "auto",
  },
  message: {
    padding: "0.5rem 1rem",
    borderRadius: "12px",
    maxWidth: "70%",
  },
};

export default Home;
