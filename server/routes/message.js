const express = require("express");
const auth = require("../middlewares/auth");
const Chat = require("../models/Chat");
const { User } = require("../models/User");
const router = express.Router();

router.get("/:chatId", auth, async (req, res) => {
  try {
    const messages = await Chat.findById(req.params.chatId)
      .select("messages -_id createdAt")
      .populate("messages.sender", "fullName avatarFile");
    res.json(messages);
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});

router.post("/", auth, async (req, res) => {
  const { content, chatId, userId } = req.body;

  if (!content || !chatId) {
    return res.status(400);
  }
  const newMessage = {
    sender: req.userId,
    content: content,
  };

  try {
    debugger;
    const sender = await User.findById(newMessage.sender).select({
      fullName: 1,
      avatarFile: 1,
    });
    debugger;
    const chat = await Chat.findById(chatId).select("messages");
    if (!chat || !sender) {
      return res.status(500).send("not found");
    }
    chat.messages.push(newMessage);
    chat.latestMessage = newMessage;
    await chat.save();
    newMessage.sender = sender;
    res.send(newMessage);
  } catch (err) {
    throw new Error("Message could not be saved:" + err.message);
  }
});

module.exports = router;
