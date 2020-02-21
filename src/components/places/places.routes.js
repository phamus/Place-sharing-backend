const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  try {
    res.json({ Welcome: "Welcome to this page" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
