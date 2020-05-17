const express = require("express");
const router = express.Router();
const clientCredentials = require("../authentication/client_credentials/app");
const getAudioFeatureOfTracks = require("../apicalls/getAudioFeatureOfTracks");
const searchandpass = require('../middleware/searchandpass');
const getTrackIdsFromTrackObjects = require('../middleware/getTrackIdsFromTrackObjects');

router.get("/", async (req, res) => {
  // Get new auth token
  let token = await clientCredentials;

  // Get trackids
  let tracks = await searchandpass(req.body.q);
  let ids = getTrackIdsFromTrackObjects(tracks);

  const options = {
    url: `https://api.spotify.com/v1/audio-features`,
    headers: {
      Authorization: "Bearer " + token,
    },
    qs: {
      ids: ids.toString(),
    },
    json: true,
  };

  let feature = await getAudioFeatureOfTracks(options);
  for (let i = 0; i < tracks.length; i++) {
    tracks[i].audio_features = feature.audio_features[i];
  }

  res.send(tracks);
});

module.exports = router;