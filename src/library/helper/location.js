const API_KEY = "AIzaSyAoFrL5cd8x0mlFIicFpfIH0M9iDgCvI30";

const axios = require("axios");
const HttpError = require("./errorHandlers");

async function getCoordsForAddress(address) {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );

  const data = response.data;

  if (!data || data.status === "ZERO_RESULT") {
    throw new HttpError(
      "could not find location for the particular address",
      422
    );
  }

  const coordinates = data.results[0].geometry.location;

  return coordinates;
}

module.exports = getCoordsForAddress;
