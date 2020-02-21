const express = require("express");
const router = express.Router();
const userController = require("./user.controller");

router.get("/:uid", userController.landing);

module.exports = router;
