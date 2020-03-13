const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(morgan("dev"));
module.exports = app;
