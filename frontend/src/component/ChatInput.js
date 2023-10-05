// ChatInput.js
import React, { useState } from "react";

const ChatInput = ({ sendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    sendMessage(message);
    setMessage("");
  };

  return (
    <div className="chat-input">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSubmit}>Send</button>
    </div>
  );
};

export default ChatInput;
