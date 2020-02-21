exports.landing = (req, res) => {
  try {
    res.json({ message: "Welccome to the user routes" });
  } catch (error) {}
};
