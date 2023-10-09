const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

// Get message history for a specific user
router.get(
  "/messages/:userId",
  isAuthenticated,
  chatController.getMessageHistory
); //working

// Send a message
router.post("/send", isAuthenticated, chatController.createChat); //working

// Get all chat rooms for the admin
router.get("/chats", isAuthenticated, isAdmin, chatController.getChats); //working

// Get messages for a specific chat room
router.get(
  "/messages/:sender/:receiver",
  isAuthenticated,
  chatController.getMessages
);

module.exports = router;
