const clientCredentials = require("./authentication/client_credentials/app");
const getArtistsTopTracks = require("./apicalls/getArtistsTopTracks");
const getAudioFeatureOfTracks = require("./apicalls/getAudioFeatureOfTracks");
const search = require("./apicalls/search");

async function searchapi() {
  try {
    // Get new auth token
    let token = await clientCredentials;

    // Get Artists Top Tracks by calling ./artists/{id}/top-tracks
    const tracks = await search(token);
    console.log(tracks.tracks.items[0]);

    for (let trackobj of tracks.tracks.items) {
      console.log(
        trackobj.name,
        trackobj.popularity,
        trackobj.external_urls.spotify
      );
    }
  } catch (err) {
    console.log(err);
  }
}
searchapi();

// Async and Await approach
async function getBpmOfTracks() {
  try {
    // Get new auth token
    let token = await clientCredentials;

    // Get Artists Top Tracks by calling ./artists/{id}/top-tracks
    const tracks = await getArtistsTopTracks(token);

    // Extract Track Ids From Track Objects and put in in an array
    const trackIds = getTrackIdsFromTrackObjects(tracks.tracks);
    const trackObjects = tracks.tracks;
    console.log(trackObjects);

    // Get new auth token
    token = await clientCredentials;

    // Get audio feature of the list of trackids
    const feature = await getAudioFeatureOfTracks(token, trackIds);
    console.log(feature.audio_features);

    // Extract tempo from audio feature of trackids
    const bpms = getBpmFromFeatureObjects(feature.audio_features);
    console.log(bpms);

    // Add the audio features to the trackObjects
    for (let i = 0; i < trackObjects.length; i++) {
      trackObjects[i].audio_features = feature.audio_features[i];
    }
    console.log(trackObjects);
  } catch (err) {
    console.log(err);
  }
}
getBpmOfTracks();

function getTrackIdsFromTrackObjects(trackObjects) {
  let trackIds = [];
  for (let obj of trackObjects) {
    trackIds.push(obj.id);
  }
  return trackIds;
}
function getBpmFromFeatureObjects(featureObjects) {
  let bpms = [];
  for (let obj of featureObjects) {
    bpms.push(obj.tempo);
  }
  return bpms;
}