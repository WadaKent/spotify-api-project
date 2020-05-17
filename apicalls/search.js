const request = require("request");

module.exports = (options) => {
  return new Promise((resolve, reject) => {
    request.get(options, function (error, response, body) {
      if (error) reject(error.statusCode, error.message);
      if (!error && response.statusCode === 200) {
        resolve(body);
      } else reject(response.statusCode, response.statusMessage);
    });
  });
};
