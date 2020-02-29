const User = require("./user.model");
const HttpError = require("../../library/helper/errorHandlers");

exports.signUp = async data => {
  const { email, name, password } = data;
  const user = new User({
    name,
    image:
      "https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png",
    email,
    password,
    places: []
  });

  await user.save();
  return user;
};

exports.findUserByEmail = async email => {
  const user = await User.findOne({ email: email });
  return user;
};

exports.authenticateUser = async data => {
  const { email, password } = data;

  const user = await User.findOne({ email });
  if (!user) {
    throw new HttpError("Invalid credentials", 401);
  }

  if (user.password !== password) {
    throw new HttpError("Invalis credentials", 401);
  }

  return user;
};

exports.getUsers = async () => {
  const users = await User.find({}, "-password");

  return users;
};
