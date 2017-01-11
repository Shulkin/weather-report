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
// timelimit, milliseconds
var timelimit = 3.6e6; // an hour
// get mongoose model
var WeatherData = require("../models/weather-data");
// helper function
function getOpenWeatherMapApiUrl(id) { // for current weather api
  return url + "weather?id=" + id + "&units=metric&appid=" + apiKey;
}
// process api/weather
router.route("/")
// get current weather in many places (POST http://localhost:3000/api/weather)
.post(function(req, res) {
  console.log("Process POST get weather request for [" + req.body.places.toString() + "]");
  var response = []; // list for weather data
  async.each(
    req.body.places, // array of items
    function(id, callback) { // process each item
      console.log("Check place with owm_id = " + id);
      // find({}).limit(1) is very quick
      WeatherData.find({owm_id: id}).limit(1).exec(function(err, list) {
        if (list.length > 0) {
          var entry = list[0];
          // console.log("[" + id + "] Found entry = " + JSON.stringify(entry));
          if ((new Date()).getTime() - entry.updated_at.getTime() > timelimit) {
            // more than hour passed since last update from OpenWeatherMap
            console.log("[" + id + "] Update data from OpenWeatherMap");
            http.get(getOpenWeatherMapApiUrl(id), function(data) {
              entry.data = JSON.stringify(data);
              // console.log("[" + id + "] Data from API = " + entry.data);
              entry.save(function(err) {
                console.log("[" + id + "] Update sucess!");
                response.push(JSON.parse(entry.data));
                callback();
              });
            });
          } else {
            console.log("[" + id + "] Return entry from database");
            response.push(JSON.parse(entry.data));
            callback();
          }
        } else {
          console.log("[" + id + "] Get first data from OpenWeatherMap");
          http.get(getOpenWeatherMapApiUrl(id), function(data) {
            // console.log("[" + id + "] Data from API = " + JSON.stringify(data));
            WeatherData.create({
              owm_id: id, // create new instance
              data: JSON.stringify(data) // save json data from api as String
            }, function(err, newEntry) {
              if (err) console.log("[" + id + "] Error " + err);
              console.log("[" + id + "] Save new data success!");
              // console.log("[" + id + "] newEntry = " + JSON.stringify(newEntry));
              response.push(JSON.parse(newEntry.data));
              callback();
            });
          });
        }
      });
    },
    function(err) { // callback on complete all tasks
      console.log("All tasks complete!");
      res.json({"list": response});
    }
  );
});
// export routes
module.exports = router;
