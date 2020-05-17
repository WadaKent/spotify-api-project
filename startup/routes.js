const express = require("express");
const search = require('../routes/search');
const getAudioFeatureOfTracks = require('../routes/getAudioFeatureOfTracks');

module.exports = function (app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/api/search', search);
  app.use('/api/getAudioFeatureOfTracks', getAudioFeatureOfTracks);
}