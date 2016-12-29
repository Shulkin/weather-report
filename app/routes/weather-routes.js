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
  console.log("Process POST request for [" + allPlaces + "]");
  //--
  var responseData = []; // list for weather data
  console.log("Search weather data in MongoDB...");
  async.each(
    cities, // array of items
    // function that each item is passed to
    function(id, callback) {
      console.log("Check place with code = [" + id + "]");
      WeatherData.find({owm_id: id}).limit(1).exec(function(err, list) {
        if (list.length > 0) {
          var entry = list[0];
          console.log("[" + id + "] Found entry!");
          console.log("[" + id + "] Data = " + JSON.stringify(entry));
          var updateTime = entry.updated_at;
          var now = new Date();
          console.log("[" + id + "] Entry update time is " + updateTime + ", and now is " + now);
          if (now.getTime() - updateTime.getTime() > 3.6e6) {
            // more than hour passed since last update from OpenWeatherMap
            console.log("[" + id + "] Timelimit exceeded, update data...");
            //--
            console.log("[" + id + "] Prepare to send http request...");
            var request = url + "weather?id=" + id + "&units=metric&appid=" + apiKey;
            http.get(request, function(data) {
              console.log("[" + id + "] Data from API = [" + JSON.stringify(data) + "]");
              console.log("[" + id + "] Save to database...");
              entry.data = JSON.stringify(data);
              entry.save(function(err) {
                console.log("[" + id + "] Update entry with API data");
                responseData.push(JSON.parse(entry.data));
                console.log("[" + id + "] Return to next entry");
                callback();
              });
            });
            //--
          } else {
            console.log("[" + id + "] No need to update data");
            responseData.push(JSON.parse(entry.data));
            console.log("[" + id + "] Return to next entry");
            callback();
          }
        } else {
          console.log("[" + id + "] Nothing here");
          console.log("[" + id + "] Prepare to send http request...");
          var request = url + "weather?id=" + id + "&units=metric&appid=" + apiKey;
          http.get(request, function(data) {
            console.log("[" + id + "] Data from API = [" + JSON.stringify(data) + "]");
            console.log("[" + id + "] Save to database...");
            WeatherData.create({
              owm_id: id, // create new instance
              data: JSON.stringify(data) // save json data from api as String
            }, function(err, newEntry) {
              if (err) console.log("[" + id + "] Error " + err);
              console.log("[" + id + "] New data from OWM saved!");
              console.log("[" + id + "] newEntry = " + JSON.stringify(newEntry));
              console.log("[" + id + "] Return to next entry");
              responseData.push(JSON.parse(newEntry.data));
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
      res.json({"list": responseData});
    }
  );
});
// export routes
module.exports = router;
