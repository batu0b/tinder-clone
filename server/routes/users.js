const express = require("express");
const router = express.Router();

router.get("/Swipes", (req, res) => {
  res.send("succusess Swipes ");
});

module.exports = router;
