const express = require("express");
const router = express.Router();
const { User } = require("../models/User");

router.get("/Swipes/:userId", async (req, res) => {
  const id = req.params.userId;
  const users = await User.find({ _id: { $ne: id } }).select({
    fullName: 1,
    file: 1,
  });
  res.send(users);
});

module.exports = router;
