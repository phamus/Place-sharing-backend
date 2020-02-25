const uuid = require("uuid/v4");

const HttpError = require("../../library/helper/errorHandlers");

const { validationResult } = require("express-validator");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Famous",
    email: "test@test.com",
    password: "tester"
  }
];

exports.getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

exports.signup = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    throw new HttpError("invalid input passed, please check your data", 422);
  }
  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find(u => u.email === email);

  if (hasUser) {
    throw new HttpError("User already exist", 400);
  }
  const createUser = {
    id: uuid(),
    name,
    password,
    email
  };
  DUMMY_USERS.push(createUser);

  res.status(201).json({ user: createUser });
};

exports.login = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    throw new HttpError("invalid input passed, please check your data", 422);
  }
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find(user => user.email === email);

  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError("could not identify user, credential is wrong", 401);
  }

  res.json({ message: "Logged in" });
};
