const dummy_places = [
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

const HttpError = require("../../library/helper/errorHandlers");

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

exports.getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const place = dummy_places.find(p => {
    return p.creator === userId;
  });

  if (!place) {
    return next(
      new HttpError("could not find place for the provided Creator", 404)
    );
  }

  res.json({ place });
};
