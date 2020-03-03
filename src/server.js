const cluster = require("cluster");
const app = require("./app");
const os = require("os");
const placeModule = require("./components").places;
const userModule = require("./components").users;
const config = require("./config");
const HttpError = require("./library/helper/errorHandlers");
const mongoose = require("mongoose");

cluster.schedulingPolicy = cluster.SCHED_RR;

if (cluster.isMaster) {
  const cpuCoreCount = os.cpus().length;

  for (let index = 0; index < cpuCoreCount; index++) {
    cluster.fork();
  }
} else {
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
    next();
  });

  app.use("/api/places", placeModule.routes);
  app.use("/api/users", userModule.routes);

  mongoose
    .connect("mongodb://127.0.0.1:27017/places", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      retryWrites: false
    })
    .then(() => console.log("MongoDB is Connected"))
    .catch(err => console.log(err));

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
