const express = require("express");
const router = express.Router();
const clientCredentials = require("../authentication/client_credentials/app");
const search = require("../apicalls/search");

router.get("/", async (req, res) => {
  // Get new auth token
  let token = await clientCredentials;

  let options = {
    url: `https://api.spotify.com/v1/search`,
    headers: {
      Authorization: "Bearer " + token,
    },
    qs: {
      q: req.body.q,
      type: "track",
      limit: 50,
    },
    json: true,
  };

  let tracks = await search(options);

  res.send(tracks);
});

module.exports = router;