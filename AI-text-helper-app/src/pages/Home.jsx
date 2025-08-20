// src/pages/Home.jsx
import React, { useEffect, useRef, useState } from "react";
import ChatBox from "../components/ChatBox";
import ChatMessage from "../components/ChatMessage";
import { getAIResponse } from "../utils/api";
import "../styles/chat.css";

export default function Home() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("gemini-chat");
    return saved ? JSON.parse(saved) : [];
  });
  const [busy, setBusy] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("gemini-chat", JSON.stringify(messages));
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  const typeOut = (id, fullText, speed = 15) =>
    new Promise((resolve) => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setMessages((prev) =>
          prev.map((m) =>
            m.id === id ? { ...m, text: fullText.slice(0, i) } : m
          )
        );
        if (i >= fullText.length) {
          clearInterval(interval);
          setMessages((prev) =>
            prev.map((m) => (m.id === id ? { ...m, typing: false } : m))
          );
          resolve();
        }
      }, speed);
    });

  const handleSend = async (userText) => {
    const userMsg = {
      id: crypto.randomUUID(),
      sender: "user",
      text: userText,
      ts: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);

    // Create an AI "typing" placeholder
    const aiId = crypto.randomUUID();
    setMessages((prev) => [
      ...prev,
      { id: aiId, sender: "ai", text: "", typing: true, ts: Date.now() },
    ]);

    setBusy(true);
    const full = await getAIResponse(userText);
    await typeOut(aiId, full);
    setBusy(false);
  };

  return (
    <div className="wrap">
      <header className="header">
        <div className="brand">
          <span className="logo">⚡</span> Gemini Chat
        </div>
      </header>

      <main className="chat">
        {messages.map((m) => (
          <ChatMessage
            key={m.id}
            sender={m.sender}
            text={m.text}
            typing={m.typing}
          />
        ))}
        <div ref={endRef} />
      </main>

      <footer className="footer">
        <ChatBox onSend={handleSend} disabled={busy} />
      </footer>
    </div>
  );
}
