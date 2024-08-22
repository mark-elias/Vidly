const express = require("express");
const router = express.Router();
// for validation, capital bc a Class is returned to it
const Joi = require("joi");

// Genres array of objects
const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Drama" },
  { id: 3, name: "Comedy" },
];
// ====== Helper Functions ==================
// returns single genre/object matching given req.param.id
function idChecker(paramID) {
  const genre = genres.find((g) => g.id === parseInt(paramID));
  return genre;
}
// validates user request body
function validateReqBody(reqBody) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(true),
  });

  return schema.validate(reqBody);
}
//====================================
// GET
// all genres
router.get("/", (req, res) => {
  res.send(genres);
});
// single genre
router.get("/:id", (req, res) => {
  const genre = idChecker(req.params.id);
  if (!genre) {
    return res.status(404).send("userID does not exist");
  }

  res.send(genre);
});
//=====================================
// PUT - Updating
router.put("/:id", (req, res) => {
  // check if id is valid
  const genre = idChecker(req.params.id);
  if (!genre) {
    return res.status(404).send("userID does not exist");
  }
  // check if request body is valid
  const { error } = validateReqBody(req.body);
  // if error, 400 bad request. Send error.details[0].message
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
    //make sure to return for errors
  }

  // if everything is good ✅. Update genre. Send Genre.
  genre.name = req.body.name;
  res.send(genre);
});
//==========================================
// POST - Adding
router.post("/", (req, res) => {
  // genre to be added
  const newGenre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  //validate req body
  const { error } = validateReqBody(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  // if everything is good ✅. add user. send added genre.
  genres.push(newGenre);
  res.send(newGenre);
});
//=======================================
// DELETE
router.delete("/:id", (req, res) => {
  //validate req id
  const genre = idChecker(req.params.id);
  if (!genre) {
    return res.status(404).send("userID does not exist");
  }
  // if everything is good ✅. delete genre/object.
  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  // send genre to user
  res.send(genre);
});
//==================
module.exports = router;
