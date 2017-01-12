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
function getOpenWeatherMapApiUrl(id) { // current weather api
  return url + "weather?id=" + id + "&units=metric&appid=" + apiKey;
}
// process api/weather
router.route("/")
// get current weather in many places (POST http://localhost:3000/api/weather)
.post(function(req, res) {
  console.log("[Weather] POST [" + req.body.places.toString() + "]");
  var response = []; // list for weather data
  async.each(
    req.body.places, // array of items
    function(id, callback) { // process each item
      console.log("[Weather] Check owm_id = " + id);
      // find({}).limit(1) is very quick
      WeatherData.find({owm_id: id}).limit(1).exec(function(err, list) {
        if (list.length > 0) {
          var entry = list[0];
          if ((new Date()).getTime() - entry.updated_at.getTime() > timelimit) {
            // more than hour passed since last update from OpenWeatherMap
            console.log("[Weather, " + id + "] Update data from OpenWeatherMap");
            http.get(getOpenWeatherMapApiUrl(id), function(data) {
              entry.data = JSON.stringify(data);
              entry.save(function(err) {
                console.log("[Weather, " + id + "] Update sucess");
                response.push(JSON.parse(entry.data));
                callback();
              });
            });
          } else {
            console.log("[Weather, " + id + "] Return entry from database");
            response.push(JSON.parse(entry.data));
            callback();
          }
        } else {
          console.log("[Weather, " + id + "] First time data from OpenWeatherMap");
          http.get(getOpenWeatherMapApiUrl(id), function(data) {
            WeatherData.create({
              owm_id: id, // create new instance
              data: JSON.stringify(data) // save json data from api as String
            }, function(err, newEntry) {
              if (err) console.log("[Weather, " + id + "] Error " + err);
              console.log("[Weather, " + id + "] Save new data success");
              response.push(JSON.parse(newEntry.data));
              callback();
            });
          });
        }
      });
    },
    function(err) { // callback on complete all tasks
      console.log("[Weather] All tasks complete");
      res.json({"list": response});
    }
  );
});
// export routes
module.exports = router;
