const express = require("express");
const router = express.Router();
const userController = require("./user.controller");
const { check } = require("express-validator");

router.get("/", userController.getUsers);

router.post(
  "/signUp",
  [
    check("name")
      .not()
      .isEmpty(),
    check("email")
      .normalizeEmail()
      .isEmail(),
    check("password").isLength({ max: 6 })
  ],
  userController.signup
);

router.post("/login", userController.login);

module.exports = router;
