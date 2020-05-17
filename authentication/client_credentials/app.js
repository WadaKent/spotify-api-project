/**
 * This is an example of a basic node.js script that performs
 * the Client Credentials oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 */

const config = require('config');
const superagent = require('superagent');
const request = require('request'); // "Request" library

const client_id = config.get('client_id'); // Your client id
const client_secret = config.get('client_secret'); // Your secret

let trackIds = [];

// your application requests authorization
const authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

// Using Callbacks
// module.exports = (callback) => {
//   request.post(authOptions, (error, response, body) => {
//     if (error) callback(error);
//     if (!error && response.statusCode === 200) {
  
//       // use the access token to access the Spotify Web API
//       callback(body.access_token);
  
//       // getArtistTopTracks(token);
//     }
//     else callback(response.statusCode);
//   });
// }


// Using Promises
module.exports = new Promise((resolve, reject) => {
  request.post(authOptions, (error, response, body) => {
    if (error) reject(error);
    if (!error && response.statusCode === 200) {
      resolve(body.access_token);
    }
    else reject(response);
  });
})