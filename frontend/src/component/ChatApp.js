import { useSelector } from "react-redux";
import io from "socket.io-client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const socket = io("http://localhost:9000");

const ChatApp = () => {
  const { user } = useSelector((state) => state.userProfile);
  const sender = "651fa1c39b11b8159c8ff58f";
  {
    console.log(user);
  }
  const roomID = "chatAdmin";
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Function to send a message through the socket
  // Function to send a message through the socket
  const sendMessageToSocket = async (message) => {
    await socket.emit("sendMessageToRoom", {
      content: message,
      sender,
      chatRoom: roomID,
    });
  };

  // Function to join a chat room
  const joinRoom = () => {
    socket.emit("joinRoom", roomID); // Emit a 'joinRoom' event to join the chat room
  };

  // Function to handle sending a new message
  const handleSendMessage = async () => {
    try {
      // Send the message to the server for storage in the database
      const response = await axios.post("/api/send", {
        sender: sender,
        content: newMessage,
        chatRoom: roomID,
      });

      // Add the message to the local state
      setMessages([...messages, response.data]);

      // Send the message via the socket for real-time updates
      sendMessageToSocket(newMessage);
    } catch (error) {
      console.error("Error sending message:", error);
    }
    setNewMessage(""); // Clear the input field after sending
  };

  useEffect(() => {
    joinRoom(); // Join the chat room when the component mounts

    // Replace with your backend API endpoint for getting messages
    axios
      .get(`/api/messages/room/${roomID}`)
      .then((response) => setMessages(response.data))
      .catch((error) => console.error("Error getting messages:", error));
  }, [newMessage, messages, roomID]);

  return (
    <div className="container mx-auto p-4">
      <div className="border border-gray-300 p-4 h-96 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className="mb-2">
            <span className="text-gray-500">{message.sender}: </span>
            {message.content}
          </div>
        ))}
      </div>
      <div className="flex mt-4">
        <input
          type="text"
          className="w-3/4 p-2 border border-gray-300"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="w-1/4 bg-blue-500 text-white p-2"
          onClick={handleSendMessage}
          onKeyPress={(event) => {
            event.key === "Enter" && handleSendMessage();
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatApp;
