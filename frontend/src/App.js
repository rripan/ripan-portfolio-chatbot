import React, { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef(null);


  useEffect(() => {
  chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages, typing]);



  const handleSend = async () => {
  if (!input.trim()) return;

  const userMessage = { from: "user", text: input };
  setMessages((prev) => [...prev, userMessage]);
  setTyping(true); // show typing

  try {
    const res = await fetch("http://127.0.0.1:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    const botMessage = { from: "bot", text: data.reply };

    setMessages((prev) => [...prev, botMessage]);
  } catch (err) {
    setMessages((prev) => [
      ...prev,
      { from: "bot", text: "Oops. Something went wrong." },
    ]);
  }

  setTyping(false); // hide typing
  setInput("");
};


  return (
  <div className="app">
    <header>
      <h1>💬 Ripan's Assistant</h1>
    </header>

    <div className="chat-box">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`chat-message ${msg.from === "user" ? "user" : "bot"}`}
        >
          {msg.text}
        </div>
      ))}

      {typing && (
        <div className="chat-message bot typing-indicator">
          <span>I am typing</span>
          <span className="dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </span>
        </div>
      )}

      {/* 👇 This is the scroll anchor */}
      <div ref={chatEndRef} />
    </div>

    <div className="chat-input">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask me anything about Ripan..."
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  </div>
);
}

export default App;
