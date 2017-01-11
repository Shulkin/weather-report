var mongoose = require("mongoose");
var ForecastDataSchema = new mongoose.Schema({
  owm_id: {type: String, required: true},
  data: {type: String, required: true},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
}, {
  collection: "forecast"
});
ForecastDataSchema.pre("save", function(next) {
  now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});
module.exports = mongoose.model("ForecastData", ForecastDataSchema);
