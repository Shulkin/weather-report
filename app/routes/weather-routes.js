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
  var places = req.body.cities.toString();
  console.log("POST request on backend " + places);
  var request = url + "group?id=" + places + "&units=metric&appid=" + apiKey;
  console.log("to " + request);
  http.request(request, function(response) {
    console.log("Response from backend http...");
    var data = ""; // JSON
    // receive another chunk of data
    response.on("data", function(chunk) {
      console.log("Receive data chunk " + chunk);
      data += chunk;
    });
    // the whole response has been recieved
    response.on("end", function() {
      console.log("Received data end " + data);
      res.json(data);
    })
  })
});
// export routes
module.exports = router;
