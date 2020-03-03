const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const placeController = require("./places.controller");

router.get("/:pid", placeController.getPlace);

router.get("/user/:uid", placeController.getPlacesByUserId);

router.post(
  "/",
  [
    check("title")
      .not()
      .isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address")
      .not()
      .isEmpty()
  ],
  placeController.createPlace
);

router.patch(
  "/:pid",
  [
    check("title")
      .not()
      .isEmpty(),
    check("description").isLength({ min: 5 })
  ],
  placeController.updatePlace
);

router.delete("/:pid", placeController.deletePlace);
module.exports = router;
