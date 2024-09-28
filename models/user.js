const Joi = require("joi");
const mongoose = require("mongoose");

// combined making Schema and making Model
// Validation
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 255,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 1024,
    },
  })
);

// Joi Validation
function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    // password length is before it gets Hashed
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validateUser = validateUser;
