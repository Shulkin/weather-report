var async = require("async");
var express = require("express");
// use express built-in router
var router = express.Router();
// load general config
var config = require("../../config/config");
// load http-request module
var http = require("../modules/http-request");
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
  var responseData = [];
  console.log("Search weather data in MongoDB...");
  async.each(
    cities, // array of items
    // function that each item is passed to
    function(id, callback) {
      console.log("Check place with code = [" + id + "]");
      WeatherData.find({owm_id: id}).limit(1).exec(function(err, entry) {
        if (entry.length > 0) {
          console.log("[" + id + "] Found entry!");
          console.log("[" + id + "] Data = " + JSON.stringify(entry));
          console.log("[" + id + "] Return to next entry");
          callback();
        } else {
          console.log("[" + id + "] Nothing here");
          console.log("[" + id + "] Prepare to send http request...");
          var request = url + "weather?id=" + city + "&units=metric&appid=" + apiKey;
          http.get(request, function(data) {
            console.log("[" + id + "] Data from API = [" + data + "]");
            console.log("[" + id + "] Save to database...");
            WeatherData.create({
              owm_id: city, // create new instance
              data: data // data from http api call
            }, function(err, newEntry) {
              console.log("[" + city + "] New data from OWM saved!");
              console.log("[" + id + "] Return to next entry");
              responseData.push(newEntry.data);
              callback();
            });
          });
        }
      });
    },
    // this function will be called after everything is done!
    function(err) {
      console.log("Everything is processed!");
      console.log("responseData = " + JSON.stringify(responseData));
      res.json(responseData);
    }
  );
  /*
  for (var i = 0; i < cities.length; i++) {
    var city = cities[i];
    console.log("Check place with code = [" + city + "]");
    WeatherData.find({owm_id: city}).limit(1).exec(function(err, data) {
      if (data.length > 0) {
        console.log("[" + city + "] Found entry!");
        console.log("[" + city + "] data = " + JSON.stringify(data));
      } else {
        console.log("[" + city + "] Nothing here");
        console.log("[" + city + "] Prepare to send http request...");
        var request = url + "weather?id=" + city + "&units=metric&appid=" + apiKey;
        http_request.get(request, function(data) {
          console.log("[" + city + "] Receive data from OpenWeatherMap, save");
          WeatherData.create({
            owm_id: city, // create new instance
            data: data // data from http api call
          });
        })
      }
    })
  }
  */
  /*
  WeatherData.find({
    cityCode: {$in: [cities]}
  }).exec(function(err, data) {
    if (err) res.send(err);
    console.log("Found in database: " + data);
  });
  */
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
