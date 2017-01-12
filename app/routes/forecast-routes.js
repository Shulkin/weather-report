var express = require("express");
var router = express.Router();
var config = require("../../config/config");
var http = require("../modules/http-request");
var url = config.url;
var apiKey = config.owmApiKey;
var timelimit = 3.6e6; // an hour
var ForecastData = require("../models/forecast-data");
function getOpenWeatherMapApiUrl(id) { // forecast api
  return url + "forecast?id=" + id + "&units=metric&appid=" + apiKey;
}
// process api/forecast/id
router.route("/:id")
// get forecast by place id (GET http://localhost:3000/api/forecast/id)
.get(function(req, res) {
  var id = req.params.id;
  console.log("[Forecast] GET [" + id + "]");
  ForecastData.find({owm_id: id}).limit(1).exec(function(err, list) {
    if (list.length > 0) {
      var entry = list[0];
      if ((new Date()).getTime() - entry.updated_at.getTime() > timelimit) {
        // more than hour passed since last update from OpenWeatherMap
        console.log("[Forecast, " + id + "] Update data from OpenWeatherMap");
        http.get(getOpenWeatherMapApiUrl(id), function(data) {
          entry.data = JSON.stringify(data);
          entry.save(function(err) {
            console.log("[Forecast, " + id + "] Update sucess");
            res.json({"forecast": JSON.parse(entry.data)});
          });
        });
      } else {
        console.log("[Forecast, " + id + "] Return entry from database");
        res.json({"forecast": JSON.parse(entry.data)});
      }
    } else {
      console.log("[Forecast, " + id + "] First time data from OpenWeatherMap");
      http.get(getOpenWeatherMapApiUrl(id), function(data) {
        ForecastData.create({
          owm_id: id,
          data: JSON.stringify(data)
        }, function(err, newEntry) {
          if (err) console.log("[Forecast, " + id + "] Error " + err);
          console.log("[Forecast, " + id + "] Save new data success");
          res.json({"forecast": JSON.parse(newEntry.data)});
        });
      });
    }
  });
});
// export routes
module.exports = router;
