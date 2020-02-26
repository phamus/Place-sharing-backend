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
