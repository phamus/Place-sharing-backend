const Place = require("./place.model");
const getCoordsForAddress = require("../../library/helper/location");
const HttpError = require("../../library/helper/errorHandlers");

exports.createPlace = async data => {
  const { title, description, address, creator } = data;
  let coordinates;

  coordinates = await getCoordsForAddress(address);
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

  return place;
};

//////////////
/// find//////
exports.findById = async id => {
  const place = await Place.findById(id);
  if (!place) {
    throw new HttpError("Place with id not found", 404);
  }
  return place;
};

exports.placeByUserId = async id => {
  const place = await Place.find({ creator: id });
  if (place.length === 0) {
    throw new HttpError("Place with user id not found", 404);
  }
  return place;
};

exports.updatePlace = async (id, data) => {
  const place = await Place.findById(id);
  if (!place) {
    throw new HttpError("Place with id not found", 404);
  }
  place.title = data.title;
  place.description = data.description;

  await place.save();

  return place;
};

exports.deletePlace = async id => {
  const place = await Place.findById(id);
  if (!place) {
    throw new HttpError("Place with id not found", 404);
  }

  await Place.remove();
  return "Place deleted";
};
