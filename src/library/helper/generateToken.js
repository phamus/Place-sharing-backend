const jwt = require("jsonwebtoken");
const { JWTSECRET } = require("../../config/index");

const generateToken = (id, email) => {
  let token = jwt.sign({ userId: id, email: email }, JWTSECRET, {
    expiresIn: "1h"
  });

  return token;
};

module.exports = generateToken;
