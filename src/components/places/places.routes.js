const express = require("express");
const router = express.Router();
const placeController = require("./places.controller");

router.get("/:pid", placeController.getPlace);

router.get("/user/:uid", placeController.getPlaceByUserId);

module.exports = router;
