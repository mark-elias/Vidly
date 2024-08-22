// to build a web server
const express = require("express");
const router = express.Router();

router.get("/", (req, res)=> {
    res.send("HomePage 🏡 mi casa")
})
//==========================
module.exports = router;
