const User = require("./user.model");
const HttpError = require("../../library/helper/errorHandlers");
const bcrypt = require("bcryptjs");

exports.signUp = async data => {
  const { email, name, password } = data;

  let hashedPassword = await bcrypt.hash(password, 12);

  const user = new User({
    name,
    image:
      "https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png",
    email,
    password: hashedPassword,
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

  let isValidPassword = bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new HttpError("Invalid credentials", 401);
  }

  return user;
};

exports.getUsers = async () => {
  const users = await User.find({}, "-password");

  return users;
};
