const request = require("request");
// Needs to get authorization_code
const authorization = require("../authentication/authorization_code/app");

const options = {
  url: `https://api.spotify.com/v1/users/${user_id}/playlists`,
  headers: {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  },
  qs: {
    ids: ids.toString(),
  },
  json: true,
};
request.get(options, function (error, response, body) {
  if (error) reject(error.statusCode, error.statusMessage);
  if (!error && response.statusCode === 200) {
    resolve(body);
  } else reject(response.statusCode, response.statusMessage);
});
