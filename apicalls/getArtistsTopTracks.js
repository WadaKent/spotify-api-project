const request = require("request");
const clientCredentials = require("../authentication/client_credentials/app");

// Max numbers of tracks is 10 according to documentation
// https://developer.spotify.com/documentation/web-api/reference/artists/get-artists-top-tracks/

// Returns the top tracks of an artist by trackID. Authentication is not built in
module.exports = (token) => {
  return new Promise((resolve, reject) => {
    const artistId = "630wzNP2OL7fl4Xl0GnMWq";
    const country_code = "JP";
    let options = {
      url: `https://api.spotify.com/v1/artists/${artistId}/top-tracks`,
      headers: {
        Authorization: "Bearer " + token,
      },
      qs: {
        country: country_code,
      },
      json: true,
    };
    request.get(options, function (error, response, body) {
      if (error) reject(error.statusCode, error.message);
      if (!error && response.statusCode === 200) {
        resolve(body);
      } else reject(response.statusCode, response.statusMessage);
    });
  });
};

// Returns the top tracks of an artist with given artistId by an array of trackObjects. Built in authentication with client credentials
// module.exports = new Promise((resolve, reject) => {
//   clientCredentials.then((token) => {
//     const artistId = "630wzNP2OL7fl4Xl0GnMWq";
//     const country_code = "JP";
//     let options = {
//       url: `https://api.spotify.com/v1/artists/${artistId}/top-tracks`,
//       headers: {
//         Authorization: "Bearer " + token,
//       },
//       qs: {
//         country: country_code,
//       },
//       json: true,
//     };
//     request.get(options, function (error, response, body) {
//       if (error) reject(error);
//       if (!error && response.statusCode === 200) {
//         resolve(body);
//       } else reject(response);
//     });
//   });
// });
