const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatarFile: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
    likedUsers: [
      {
        type: String,
      },
    ],
    dislikedUsers: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

function validateRegister(user) {
  const schema = new Joi.object({
    fullName: Joi.string().required(),
    file: Joi.string().required(),
    avatarFile: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(user);
}
function validateLogin(user) {
  const schema = new Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(user);
}

userSchema.methods.createAuthToken = (id) => {
  return jwt.sign({ _id: id }, "jwtSecretKey");
};

const User = mongoose.model("User", userSchema);

module.exports = { User, validateLogin, validateRegister };
