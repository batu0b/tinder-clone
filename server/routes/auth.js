const express = require("express");
const { validateRegister, User, validateLogin } = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const auth = require("../middlewares/auth");
const { upload } = require("../helpers/multer");

router.post("/register", upload.single("file"), async (req, res) => {
  const { error } = validateRegister({ ...req.body, file: req.file.filename });

  console.log(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });

  if (user) {
    return res
      .status(400)
      .send("There is already a user with this email address");
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  user = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    password: hashedPassword,
    file: req.file.filename,
    avatarFile: req.body.avatarFile,
  });

  await user.save();

  const token = user.createAuthToken(user._id);
  res.header("x-auth-token", token).send(user);
});

router.post("/login", async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) {
    return res.status(405).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Incorrect email or password");
  }

  const isSuccess = await bcrypt.compare(req.body.password, user.password);
  if (!isSuccess) {
    return res.status(400).send("Incorrect email or password");
  }

  const token = await user.createAuthToken(user._id);

  const userWithoutPassword = { ...user.toObject() };
  delete userWithoutPassword.password;

  res.header("x-auth-token", token).send(userWithoutPassword);
});

router.post("/me", auth, async (req, res) => {
  const user = await User.findById(req.userId).select({ password: 0 });
  if (user) {
    return res.send(user);
  }
  return res.status(400).send("User not found");
});

module.exports = router;
