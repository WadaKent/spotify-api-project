const express = require("express");
const router = express.Router();
const clientCredentials = require("../authentication/client_credentials/app");
const search = require("../apicalls/search");

module.exports = async(q) => {
  let token = await clientCredentials;

  let options = {
    url: `https://api.spotify.com/v1/search`,
    headers: {
      Authorization: "Bearer " + token,
    },
    qs: {
      q: q,
      type: "track",
      limit: 50,
    },
    json: true,
  };

  let tracks = await search(options);
  return tracks.tracks.items;
}