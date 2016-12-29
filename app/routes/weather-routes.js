var http = require("http");
var express = require("express");
// use express built-in router
var router = express.Router();
// load general config
var config = require("../../config/config");
// key and api url for OpenWeatherMap
var url = config.url;
var apiKey = config.owmApiKey;
// get mongoose model
var WeatherData = require("../models/weather-data");
// process api/weather
router.route("/")
// get current weather in many cities (POST http://localhost:3000/api/weather)
.post(function(req, res) {
  var cities = req.body.cities;
  var allPlaces = cities.toString();
  console.log("Process POST request for [" + allPlaces + "]")
  //--
  console.log("Search weather data in MondoDB...")
  WeatherData.find({
    cityCode: {$in: [cities]}
  }).exec(function(err, data) {
    if (err) res.send(err);
    console.log("Found in database: " + data);

  })
  //--
  /*
  var request = url + "group?id=" + places + "&units=metric&appid=" + apiKey;
  http.get(request, function(response) {
    var statusCode = response.statusCode;
    var contentType = response.headers["content-type"];
    var error; // check for errors
    if (statusCode != 200) {
      error = new Error(
        "Request Failed.\n" +
        "Status Code: ${statusCode}");
    } else if (!/^application\/json/.test(contentType)) {
      error = new Error(
        "Invalid content-type.\n" +
        "Expected application/json but received ${contentType}");
    }
    if (error) { // if not undefined
      console.log(error.message);
      response.resume();
      return;
    }
    response.setEncoding("utf8");
    var rawData = ""; // JSON
    // receive another chunk of data
    response.on("data", function(chunk) {
      rawData += chunk;
    });
    // the whole response has been recieved
    response.on("end", function() {
      var parsedData = JSON.parse(rawData);
      res.json(parsedData);
    })
  });
  */
});
// export routes
module.exports = router;
