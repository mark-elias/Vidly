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
//========================================
const port = process.env.PORT || 5002;
app.listen(port, () => {
  console.log(`🦻 Listening on Port: ${port}...`);
});
