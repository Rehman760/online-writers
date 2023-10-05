// ChatRoom.js
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { sendMessage } from "../actions/chatActions";

const ChatRoom = ({ messages, sendMessage, match }) => {
  const chatId = match.params.chatId;
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    sendMessage(chatId, message); // You may need to pass the sender's ID
    setMessage("");
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <div className="messages">
        {messages.map((msg) => (
          <div key={msg.id} className="message">
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSubmit}>Send</button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  messages: state.chatGetMessages.messages, // Assuming you have a messages array with chat details
});

export default connect(mapStateToProps, { sendMessage })(ChatRoom);
