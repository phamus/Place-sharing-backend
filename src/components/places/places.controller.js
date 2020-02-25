const HttpError = require("../../library/helper/errorHandlers");
const uuid = require("uuid/v4");

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

exports.getPlace = (req, res, next) => {
  const placeId = req.params.pid;

  const place = dummy_places.find(p => {
    return p.id === placeId;
  });
  if (!place) {
    throw new HttpError("could not find place for the provided ID", 404);
  }

  res.json({ place });
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

exports.createPlace = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body;

  const createdPlace = {
    id: uuid(),
    title,
    description,
    location: coordinates,
    address,
    creator
  };

  dummy_places.push(createdPlace);
  console.log(dummy_places);
  res.status(201).json({ place: createdPlace });
};

exports.updatePlace = (req, res, next) => {
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
  dummy_places = dummy_places.filter(p => p.id !== placeId);
  res.status(200).json({ message: "Deleted Place" });
};
