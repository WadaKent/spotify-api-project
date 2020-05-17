const express = require('express');
const app = express();

require('./startup/routes')(app);



// Create Server
const port = process.env.PORT || 3001;
const server = app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = server;
