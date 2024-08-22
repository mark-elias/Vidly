const express = require("express");
const app = express();
//=====================================
//middleware so that we can use json
app.use(express.json());

//=====================================
const port = process.env.PORT || 5002;
app.listen(port, () => {
  console.log(`🦻 Listening on Port: ${port}...`);
});