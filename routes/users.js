const _ = require("lodash");
const { User, validateUser } = require("../models/user");
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  //   User.find()
  //     .sort("name")
  //     .then((result) => res.send(result));

  // Validate given request body to make sure its a valid user
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // Now make sure that it is not a duplicate user
  // check if there is a duplicate email already
  User.findOne({ email: req.body.email })
    .then((user) => {
      // if we get a user, it means there is already a user with the same email in our database
      if (user) return res.status(400).send("User already registered");

      // Now make a new user with req.body
      user = new User(_.pick(req.body, ["name", "email", "password"]));

      user.save();
    })
    .catch((err) => res.send(err.message));
});

module.exports = router;
