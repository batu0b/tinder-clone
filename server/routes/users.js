const express = require("express");
const router = express.Router();
const { User } = require("../models/User");

router.get("/Swipes/:userId", async (req, res) => {
  const id = req.params.userId;
  const user = await User.findById(id).select({
    likedUsers: 1,
    _id: 0,
    dislikedUsers: 1,
  });
  const users = await User.find({
    _id: { $nin: [id, ...user.likedUsers, ...user.dislikedUsers] },
  }).select({
    fullName: 1,
    file: 1,
  });
  res.send(users);
});

router.post("/Swipe/:dir", async (req, res) => {
  const dir = req.params.dir;
  const otherUserId = req.body.otherUserId;
  const userId = req.body.id;
  const user = await User.findById(userId).select({
    likedUsers: 1,
    dislikedUsers: 1,
  });
  const likedUser = await User.findOne({
    _id: userId,
    likedUsers: { $in: [otherUserId] },
  });
  const dislikedUser = await User.findOne({
    _id: userId,
    dislikedUsers: { $in: [otherUserId] },
  });
  if (dir === "right") {
    if (!likedUser) {
      user.likedUsers.push(otherUserId);
      await user.save();
      const otherUser = await User.findOne({
        _id: otherUserId,
        likedUsers: { $in: [userId] },
      });
      if (!!otherUser) {
        res.send({
          match: true,
          user: { fullName: otherUser.fullName, avatar: otherUser.avatarFile },
        });
      } else {
        res.send({ match: false });
      }
      if (!!dislikedUser) {
        dislikedUser.dislikedUsers.pull(otherUserId);
        await dislikedUser.save();
      }
    } else {
      res.send({ match: false });
    }
  } else if (dir === "left") {
    if (!dislikedUser) {
      user.dislikedUsers.push(otherUserId);
      await user.save();
      res.send({ match: false });
      if (!!likedUser) {
        likedUser.likedUsers.pull(otherUserId);
        await likedUser.save();
      }
    }
  }
});

module.exports = router;
