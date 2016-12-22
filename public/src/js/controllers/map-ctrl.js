angular.module("map.ctrl", ["openlayers-directive"])
.controller("MapCtrl", ["Cities", "WeatherData",
  function(Cities, WeatherData) {
  // === Variables ===
  var vm = this;
  // default center of the map
  vm.primorye = {
    lat: 45.3,
    lon: 134.6,
    zoom: 6
  };
  // layers list
  vm.layers = [{
    // OpenStreetMap basemap
    name: 'OpenStreetMap',
    active: true,
    source: {type: 'OSM'}
  }];
  // === Private ===
  // constructor
  function init() {
    // markers on map
    vm.markers = []; // empty
    // get weather for all cities in Primorsky region
    WeatherData.getWeatherById(Cities.toString(Cities.all()))
    .then(function(data) {
      // parse JSON response
      var list = data.list;
      for (var i = 0; i < list.length; i++) {
        // fill up marker
        var marker = {};
        marker.name = list[i].name;
        // coordinates
        marker.lat = list[i].coord.lat;
        marker.lon = list[i].coord.lon;
        // general weather in JSON format
        marker.weather = list[i].weather[0];
        // create popup label
        var temperature = Math.round(list[i].main.temp);
        marker.label = {
          show: true, // always show
          // temperature, city name
          message: temperature + " °C" + " | " + "<b>" + marker.name + "</b>"
        };
        // custom icon
        var iconCode = "01d.png";
        marker.style = {
          image: {
            icon: {
              anchor: [0.5, 0.95],
              anchorXUnits: "fraction",
              anchorYUnits: "fraction",
              opacity: 0.9,
              src: "http://openweathermap.org/img/w/" + iconCode
            }
          }
        };
        // push to markers array
        vm.markers.push(marker);
      }
      // console.log(JSON.stringify(data));
    }, function(err) {
      console.log("Error " + err);
    });
  }
  // === Start module ===
  init();
  // === Public ===
}]);
