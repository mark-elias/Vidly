const bcrypt = require("bcrypt");
const _ = require("lodash");
// most of the code is same as user.js
// removed userValidate function
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  // Validate given email and password with schema function
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // check if email matches email in DB
  let user = await User.findOne({ email: req.body.email });
  // if user doesnt enter the right email
  if (!user) return res.status(400).send("Invalid email or password");
  // Next we need to validate the password
  // compare plain text password with hashed password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
});

// Joi Validation
function validate(req) {
  // make a Joi schema
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    // password length is before it gets Hashed
    password: Joi.string().min(5).max(255).required(),
  });

  // validate is a method for our schema
  return schema.validate(user);
}

module.exports = router;
