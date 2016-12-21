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
  /*
  vm.markers = [
    {
      name: "eiffel",
      lat: 48.858093,
      lon: 2.294694,
      label: {
        message: '<img src="images/eiffel.jpg" />',
        show: false,
        showOnMouseOver: true
      }
    }
  ];
  */
  // === Private ===
  // constructor
  function init() {
    // markers on map
    vm.markers = []; // empty
    // get weather for all cities in Primorsky region
    WeatherData.getWeatherById(Cities.toString(Cities.all()))
    .then(function(data) {
      // fill up markers
      console.log("Data " + data);
    }, function(err) {
      console.log("Error " + err);
    });
  }
  // === Start module ===
  init();
  // === Public ===
}]);
