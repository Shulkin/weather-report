// === Initialize ===
// grab npm modules
var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require("mongoose");
// initialize express app
var app = express();
// set up the port
var port = process.env.PORT || 3000;
// load the database config
var database = require("./config/database");
// connect to database
mongoose.connect(database.url);
// === Configure ===
// set up express middleware
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(express.static(path.join(__dirname, "public")));
app.use("/bower_components", express.static(path.join(__dirname, "bower_components")));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({type: "application/vnd.api+json"}));
app.use(methodOverride());
// load api routes
app.use("/api/weather", require("./app/routes/weather-routes"));
app.use("/api/forecast", require("./app/routes/forecast-routes"));
// default route to index.html
app.get("*", function(req ,res) {
  // anything else is up to Angular
  res.sendFile("./public/index.html");
});
// === Start server ===
app.listen(port);
console.log("Server started at port " + port);
