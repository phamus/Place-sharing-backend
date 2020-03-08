const express = require("express");
const router = express.Router();
const userController = require("./user.controller");
const { check } = require("express-validator");
const fileUpload = require("../../middleware/file-upload");

router.get("/", userController.getUsers);

router.post(
  "/signUp",
  fileUpload.single("image"),
  [
    check("name", "name is required")
      .not()
      .isEmpty(),
    check("email", "enter a valid email")
      .normalizeEmail()
      .isEmail(),
    check("password", "enter a valid password").isLength({ min: 6 })
  ],
  userController.signup
);

router.post("/login", userController.login);

module.exports = router;
