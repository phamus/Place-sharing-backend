const HttpError = require("../../library/helper/errorHandlers");

const { validationResult } = require("express-validator");

const userService = require("./user.services");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await userService.getUsers();
    res.json({ users: users.map(user => user.toObject({ getters: true })) });
  } catch (error) {
    res.json({ message: error.message });
  }
};

///////////////////////////
///// Signup User /////////
exports.signup = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    console.log(error);
    return next(
      new HttpError("invalid input passed, please check your data", 422)
    );
  }
  console.log(req.body);

  const { name, email, password } = req.body;

  try {
    const userExist = await userService.findUserByEmail(email);
    if (userExist) {
      return next(new HttpError("Email Already exist", 422));
    }
    const createduser = await userService.signUp({
      name,
      email,
      password
    });

    console.log(createduser);
    res.status(201).json({ user: createduser.toObject({ getters: true }) });
  } catch (error) {
    res.json({ message: error.message });
  }
};

/////////////////////////
///// Login Users //////
exports.login = async (req, res, next) => {
  console.log(req.body);
  const error = validationResult(req).array();
  if (error.length > 0) {
    throw new HttpError("invalid input passed, please check your data", 422);
  }

  try {
    const { email, password } = req.body;
    const user = await userService.authenticateUser({ email, password });
    res.status(201).json({ user: user.toObject({ getters: true }) });
  } catch (error) {
    return next(new HttpError(error.message, 422));
  }
};
