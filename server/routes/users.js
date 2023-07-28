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
  if (dir === "right") {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $push: { likedUsers: otherUserId },
      },
      { new: true, useFindAndModify: false }
    );

    if (!!user) {
      const otherUser = await User.findOne({
        _id: otherUserId,
        likedUsers: { $in: [userId] },
      });

      if (!!otherUser) {
        res.send({ match: true });
      }
    } else {
      res.send({ match: false });
    }
  } else if (dir === "left") {
    await User.findByIdAndUpdate(
      userId,
      {
        $push: { dislikedUsers: otherUserId },
      },
      { new: true, useFindAndModify: false }
    );
  }
});

module.exports = router;
