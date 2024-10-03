const mongoose = require("mongoose");
const express = require("express");
const app = express();
// Middleware
app.use(express.json());
//=====================================
// Routing
const home = require("./routes/home");
app.use("/", home);
const genres = require("./routes/genres");
app.use("/api/genres", genres);
const users = require("./routes/users");
app.use("/api/users", users);
const auth = require("./routes/auth");
app.use("api/auth", auth);
//========================================
const port = process.env.PORT || 5002;
app.listen(port, () => {
  console.log(`🦻 Listening on Port: ${port}...`);
});
mongoose
  .connect("mongodb://localhost:27017/playground")
  .then(() => console.log("🌱 Connected to MongoDB"))
  .catch((err) => console.log(err));
