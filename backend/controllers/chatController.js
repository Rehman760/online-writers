const mongoose = require("mongoose");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const { getUserSocket } = require("../sockets/userSocketMap");
const io = require("../server");

exports.sendMessage = async (req, res) => {
  try {
    const { sender, receiver, content, chatRoom } = req.body;

    // Validate sender and receiver IDs here

    const message = new Message({ sender, receiver, content, chatRoom });
    await message.save();

    // Broadcast the message to the recipient's socket
    const receiverSocketId = getUserSocket(receiver); // Implement a userSocketMap as previously mentioned
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("message", message);
    }

    return res.status(201).json(message);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while sending the message." });
  }
};

exports.getChats = async (req, res) => {
  try {
    // Assuming req.user contains the admin's user information
    const adminUserId = req.user._id;

    // Find all messages where the admin is the sender or receiver
    const messages = await Message.find({
      $or: [{ sender: adminUserId }, { receiver: adminUserId }],
    });

    // Collect unique user IDs that the admin has interacted with
    const chatUserIds = new Set();
    messages.forEach((message) => {
      if (message.sender.toString() !== adminUserId.toString()) {
        chatUserIds.add(message.sender);
      }
      if (message.receiver.toString() !== adminUserId.toString()) {
        chatUserIds.add(message.receiver);
      }
    });

    // Fetch user details for the unique user IDs
    const chatUsers = await User.find({
      _id: { $in: Array.from(chatUserIds) },
    });

    res.json(chatUsers);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching chat users." });
  }
};

exports.getChatMessages = async (req, res) => {
  try {
    const { roomId } = req.params;

    // Validate the chat room exists

    // Fetch messages for a specific chat room
    const messages = await Message.find({ chatRoom: roomId }).sort("timestamp");

    // Update message read status
    await Message.updateMany(
      { chatRoom: roomId, receiver: req.user._id, read: false },
      { $set: { read: true } }
    );

    res.json(messages);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching chat messages." });
  }
};

exports.getMessageHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: req.user._id },
        { receiver: userId, sender: req.user._id },
      ],
    }).sort({ timestamp: -1 });
    return res.json(messages);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching message history." });
  }
};
