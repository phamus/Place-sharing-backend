const HttpError = require("../../library/helper/errorHandlers");
const uuid = require("uuid/v4");
const { validationResult } = require("express-validator");
const placeService = require("./places.services");

///////////////////////////////
///// get place by placeid ////
exports.getPlace = async (req, res, next) => {
  const placeId = req.params.pid;

  try {
    const place = await placeService.findById(placeId);
    res.json({ place: place.toObject({ getters: true }) });
  } catch (err) {
    console.log(err);
    //const error = new HttpError("creating place failed, please try again", 500);
    return next(err);
  }
};

exports.getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  try {
    const places = await placeService.placeByUserId(userId);
    res.json({
      places: places.map(place => place.toObject({ getters: true }))
    });
  } catch (err) {
    console.log(err);
    //const error = new HttpError("creating place failed, please try again", 500);
    return next(err);
  }
};

////////////////////////////////
//////// create place /////////
exports.createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("invalid input passed, please check your data", 422)
    );
  }

  try {
    const { title, description, address, creator } = req.body;

    const data = {
      title,
      description,
      address,
      creator
    };

    const place = await placeService.createPlace(data);
    res.status(201).json({ place });
  } catch (error) {
    res.json({ message: error.message });
  }
};

/////////////////////////
/// update place //////
exports.updatePlace = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    throw new HttpError("invalid input passed, please check your data", 422);
  }
  const { title, description } = req.body;
  const placeId = req.params.pid;

  try {
    const updatedPlace = await placeService.updatePlace(placeId, {
      title,
      description
    });
    res.status(200).json({ place: updatedPlace.toObject({ getters: true }) });
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "something went wrong udpating place with the id",
      500
    );
    return next(error);
  }
};

exports.deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;
  try {
    await placeService.deletePlace(placeId);
    res.status(200).json({ message: "Deleted Place" });
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "something went wrong udpating place with the id",
      500
    );
    return next(error);
  }
};
