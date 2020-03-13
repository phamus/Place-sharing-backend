const HttpError = require("../library/helper/errorHandlers");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; //Authorization: 'Bearer Token;

    if (!token) {
      throw new Error("Authentication failed");
    }
  } catch (err) {
    const error = new HttpError("Authentication failed", 401);
    return next(error);
  }
};
