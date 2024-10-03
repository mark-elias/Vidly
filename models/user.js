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
  // make a Joi schema
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    // password length is before it gets Hashed
    password: Joi.string().min(5).max(255).required(),
  });

  // validate is a method for our schema
  return schema.validate(user);
}

exports.User = User;
exports.validateUser = validateUser;
