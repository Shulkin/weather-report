var mongoose = require("mongoose");
// define weather data schema
var WeatherDataSchema = new mongoose.Schema({
  // id of the place from OpenWeatherMap API
  owm_id: {type: String, required: true},
  // store JSON data from OWM API as String
  data: {type: String, required: true},
  // timestamps
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
}, {
  // explicitly state the collection name
  collection: "data"
});
// set created_at equal to the current time on save data
WeatherDataSchema.pre("save", function(next) {
  now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});
module.exports = mongoose.model("WeatherData", WeatherDataSchema);
