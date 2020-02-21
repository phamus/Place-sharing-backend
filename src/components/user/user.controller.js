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

exports.landing = (req, res, next) => {
  const userId = req.params.uid;
  const place = dummy_places.find(p => {
    return p.creator === userId;
  });

  if (!place) {
    return res.status(404).json({ Message: "User doesnt exist" });
  }

  res.json({ place });
};
