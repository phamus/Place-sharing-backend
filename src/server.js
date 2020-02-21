const cluster = require("cluster");
const app = require("./app");
const os = require("os");
const placeModule = require("./components").places;
const userModule = require("./components").users;
const config = require("./config");

cluster.schedulingPolicy = cluster.SCHED_RR;

if (cluster.isMaster) {
  const cpuCoreCount = os.cpus().length;

  for (let index = 0; index < cpuCoreCount; index++) {
    cluster.fork();
  }
} else {
  app.use("/api/places", placeModule.routes);
  app.use("/api/users", userModule.routes);

  app.listen(config.PORT, err => {
    if (err) {
      console.log(err);
      process.exit(1);
      return;
    }

    console.log(`Server is running on port: ${config.PORT}`);
  });
}
