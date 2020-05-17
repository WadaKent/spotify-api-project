const request = require("request");
const clientCredentials = require("../authentication/client_credentials/app");

// Max number of tracks in one request is 100 according to documentation
// https://developer.spotify.com/documentation/web-api/reference/tracks/get-several-audio-features/

// Returns audio features of tracks with given ID. Authenticataion not built in
module.exports = (options) => {
  return new Promise((resolve, reject) => {
    request.get(options, function (error, response, body) {
      if (error) reject(error.statusCode, error.statusMessage);
      if (!error && response.statusCode === 200) {
        resolve(body);
      } else reject(response.statusCode, response.statusMessage);
    });
  });
};

// Returns audio features of tracks with given ID. Built in authentication.
// module.exports = (ids) => {
//   return new Promise((resolve, reject) => {
//     clientCredentials.then((token) => {
//       const options = {
//         url: `https://api.spotify.com/v1/audio-features`,
//         headers: {
//           Authorization: "Bearer " + token,
//         },
//         qs: {
//           ids: ids.toString(),
//         },
//         json: true,
//       };
//       request.get(options, function (error, response, body) {
//         if (error) reject(error);
//         if (!error && response.statusCode === 200) {
//           resolve(body);
//         } else reject(response);
//       });
//     });
//   });
// };
