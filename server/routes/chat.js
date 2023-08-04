const express = require("express");
const auth = require("../middlewares/auth");
const Chat = require("../models/Chat");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const chats = await Chat.find({
      users: { $elemMatch: { $eq: req.userId } },
    }).populate("users", "name avatarFile");
    res.send(chats);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = router;
