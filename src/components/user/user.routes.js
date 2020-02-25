const express = require("express");
const router = express.Router();
const userController = require("./user.controller");

router.get("/", userController.getUsers);

router.post("/signUp", userController.signup);

router.post("/login", userController.login);

module.exports = router;
