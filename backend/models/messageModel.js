// models/Message.js
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: String,
  timestamp: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
  chatRoom: { type: String, required: true },
});

module.exports = mongoose.model("Message", messageSchema);
