// sockets/chatSocket.js
const socketIo = require("socket.io");
const Message = require("../models/messageModel");

function initializeChatSocket(server) {
  const io = socketIo(server);

  io.on("connection", (socket) => {
    console.log("user is connected");
    // Handle real-time messaging here
    socket.on("message", async (data) => {
      try {
        // Validate data
        if (!data || !data.sender || !data.receiver || !data.content) {
          // Handle validation errors
          console.error("Invalid message data received");
          return;
        }

        // Store the message in the database
        const message = new Message(data);
        await message.save();

        console.log("Message saved", message);

        // Broadcast the message to the recipient's socket
        const recipientSocket = io.sockets.connected[data.receiverSocketId];
        if (recipientSocket) {
          recipientSocket.emit("message", message);
        } else {
          // Handle case where recipient is not online
          console.log("Recipient is not online");
        }
      } catch (error) {
        // Handle database or other errors
        console.error("Error sending message:", error);
      }
    });

    // Handle user disconnect and other socket events
    socket.on("disconnect", () => {
      // Handle disconnect logic
      console.log("user disconnected");
    });
  });
}

module.exports = initializeChatSocket;
