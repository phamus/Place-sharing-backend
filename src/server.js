const cluster = require("cluster");
const app = require("./app");
const os = require("os");
const placeModule = require("./components").places;
const userModule = require("./components").users;
const config = require("./config");
const HttpError = require("./library/helper/errorHandlers");

cluster.schedulingPolicy = cluster.SCHED_RR;

if (cluster.isMaster) {
  const cpuCoreCount = os.cpus().length;

  for (let index = 0; index < cpuCoreCount; index++) {
    cluster.fork();
  }
} else {
  app.use("/api/places", placeModule.routes);
  app.use("/api/users", userModule.routes);

  app.use((req, res, next) => {
    const error = new HttpError("could not find this route", 404);
    throw error;
  });

  app.use((error, req, res, next) => {
    if (res.headerSent) {
      return next(error);
    }

    res.status(error.code || 500);
    res.json({ message: error.message || "An Unknown error occured" });
  });

  app.listen(config.PORT, err => {
    if (err) {
      console.log(err);
      process.exit(1);
      return;
    }

    console.log(`Server is running on port: ${config.PORT}`);
  });
}
