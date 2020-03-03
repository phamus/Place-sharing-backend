const Place = require("./place.model");
const getCoordsForAddress = require("../../library/helper/location");
const HttpError = require("../../library/helper/errorHandlers");
const User = require("../user/user.model");
const mongoose = require("mongoose");

exports.createPlace = async data => {
  const { title, description, address, creator } = data;

  let user = await User.findById(creator);
  if (!user) {
    throw new HttpError("Could not find user with the provided id", 404);
  }

  let coordinates = await getCoordsForAddress(address);
  const place = new Place({
    title,
    description,
    address,
    location: coordinates,
    image:
      "https://topnaija.ng/wp-content/uploads/2019/06/Lagos-city-topnaija.ng_.-png.png",
    creator
  });

  await place.save();
  user.places.push(place._id);
  await user.save();

  return place;
};

//////////////
/// find//////
exports.findById = async id => {
  const place = await Place.findById(id);
  if (!place) {
    throw new HttpError("Place not found", 404);
  }
  return place;
};

exports.placeByUserId = async id => {
  const userWithPlaces = await User.findById(id).populate("places");

  if (!userWithPlaces || userWithPlaces.places.length === 0) {
    throw new HttpError("Place with user id not found", 404);
  }
  return userWithPlaces;
};

exports.updatePlace = async (id, data) => {
  const place = await Place.findById(id);
  if (!place) {
    throw new HttpError("Place not found", 404);
  }
  place.title = data.title;
  place.description = data.description;

  await place.save();

  return place;
};

exports.deletePlace = async id => {
  const place = await Place.findById(id).populate("creator");
  if (!place) {
    throw new HttpError("Place not found", 404);
  }

  await Place.remove();
  place.creator.places.pull(place._id);
  await place.creator.save();
  return "Place deleted";
};
