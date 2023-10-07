const socketIo = require("socket.io");
const Message = require("../models/messageModel");

function initializeChatSocket(server) {
  const io = socketIo(server, {
    cors: {
      origin: "http://localhost:3000", // Allow requests from your React app's origin
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User is connected");

    socket.on("joinRoom", (room) => {
      // Join the user to the specified chat room
      socket.join(room);
      console.log(`User joined room: ${room}`);
    });

    socket.on("sendMessageToRoom", async (data) => {
      const { content, sender, chatRoom } = data;

      if (!content || !sender || !chatRoom) {
        console.log("Invalid message data");
        return;
      }

      const message = new Message({
        content,
        sender,
        chatRoom,
        timestamp: Date.now(),
      });
      await message.save();
      console.log("Message saved");

      // Broadcast the message to the chat room
      io.to(chatRoom).emit("message", message);
    });

    socket.on("disconnect", () => {
      console.log("User is disconnected");
    });
  });
}

module.exports = initializeChatSocket;
