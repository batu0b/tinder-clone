const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    sender: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const chatSchema = mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    users: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
    lastMessage: messageSchema,
    messages: [messageSchema],
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
