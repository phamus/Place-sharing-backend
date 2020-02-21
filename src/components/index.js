const placeRoutes = require("./places/places.routes");
const placeServices = require("./places/places.services");
const userRoutes = require("./user/user.routes");
const userServices = require("./user/user.services");

const componentModules = {
  places: {
    routes: placeRoutes,
    services: placeServices
  },
  users: {
    routes: userRoutes,
    services: userServices
  }
};

module.exports = componentModules;
