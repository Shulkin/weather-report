var express = require("express");
var router = express.Router();
var config = require("../../config/config");
var http = require("../modules/http-request");
var url = config.url;
var apiKey = config.owmApiKey;
var timelimit = 3.6e6; // an hour
var ForecastData = require("../models/forecast-data");
function getOpenWeatherMapApiUrl(id) { // for forecast api
  return url + "forecast?id=" + id + "&units=metric&appid=" + apiKey;
}
// process api/forecast/id
router.route("/:id")
// get forecast by place id (GET http://localhost:3000/api/forecast/id)
.get(function(req, res) {
  var id = req.params.id;
  console.log("Process GET forecast request for [" + id + "]");
  ForecastData.find({owm_id: id}).limit(1).exec(function(err, list) {
    if (list.length > 0) { // forecast in database
      var entry = list[0];
      console.log("[" + id + "] Found entry = " + JSON.stringify(entry));
      if ((new Date()).getTime() - entry.updated_at.getTime() > timelimit) {
        // more than hour passed since last update from OpenWeatherMap
        console.log("[" + id + "] Update data from OpenWeatherMap");
        http.get(getOpenWeatherMapApiUrl(id), function(data) {
          entry.data = JSON.stringify(data);
          console.log("[" + id + "] Data from API = " + entry.data);
          entry.save(function(err) {
            console.log("[" + id + "] Update sucess!");
            // response
            res.json({"forecast": JSON.parse(entry.data)});
          });
        });
      } else {
        console.log("[" + id + "] Return entry from database");
        // response
        res.json({"forecast": JSON.parse(entry.data)});
      }
    } else { // no forecast found
      console.log("[" + id + "] Get first forecast data from OpenWeatherMap");
      http.get(getOpenWeatherMapApiUrl(id), function(data) {
        console.log("[" + id + "] Data from API = " + JSON.stringify(data));
        ForecastData.create({
          owm_id: id,
          data: JSON.stringify(data)
        }, function(err, newEntry) {
          if (err) console.log("[" + id + "] Error " + err);
          console.log("[" + id + "] Save new data success!");
          console.log("[" + id + "] newEntry = " + JSON.stringify(newEntry));
          // response
          res.json({"forecast": JSON.parse(newEntry.data)});
        });
      });
    }
  });
});
// export routes
module.exports = router;
