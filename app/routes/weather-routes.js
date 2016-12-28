var express = require("express");
// use express built-in router
var router = express.Router();
// get mongoose model
var WeatherData = require("../models/weather-data");
// process api/weather
// export routes
module.exports = router;
