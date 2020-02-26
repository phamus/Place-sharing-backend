const HttpError = require("../../library/helper/errorHandlers");
const uuid = require("uuid/v4");
const { validationResult } = require("express-validator");
const placeService = require("./places.services");

let dummy_places = [
  {
    id: "u1",
    title: "Lagos City",
    description: "Beautiful Place in Lagos ",
    imageUrl: "https://bantuphotos.com/watermark/water-mark-YhuocfMvn0.jpg",
    address: "CMS Central Park, Marina Road, Lagos",
    location: {
      lat: 6.4509483,
      lng: 3.3870513
    },
    creator: "u1"
  }
];

///////////////////////////////
///// get place by placeid ////
exports.getPlace = async (req, res, next) => {
  const placeId = req.params.pid;

  try {
    const place = await placeService.findById(placeId);
    res.json({ place });
  } catch (err) {
    console.log(err);
    //const error = new HttpError("creating place failed, please try again", 500);
    return next(err);
  }
};

exports.getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const places = dummy_places.filter(p => {
    return p.creator === userId;
  });

  if (!places || places.length === 0) {
    return next(
      new HttpError("could not find places for the provided Creator", 404)
    );
  }

  res.json({ places });
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
  } catch (err) {
    console.log(err);
    const error = new HttpError("creating place failed, please try again", 500);
    return next(error);
  }
};

exports.updatePlace = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    throw new HttpError("invalid input passed, please check your data", 422);
  }
  const { title, description } = req.body;
  const placeId = req.params.pid;

  const updatedPlace = dummy_places.find(p => p.id === placeId);

  const placeIndex = dummy_places.findIndex(p => p.id === placeId);

  updatedPlace.title = title;
  updatedPlace.description = description;

  dummy_places[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};

exports.deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  if (!dummy_places.find(p => p.id === placeId)) {
    throw new HttpError("could not find a place for the that id", 404);
  }
  dummy_places = dummy_places.filter(p => p.id !== placeId);
  res.status(200).json({ message: "Deleted Place" });
};
