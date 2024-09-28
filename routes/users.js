const { User, UserValidate } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  User.find()
    .sort("name")
    .then((result) => res.send(result));
});

module.exports = router;
