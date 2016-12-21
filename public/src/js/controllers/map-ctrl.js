angular.module("map.ctrl", ["openlayers-directive"])
.controller("MapCtrl", ["WeatherData", function(WeatherData) {
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
  // markers on map
  vm.markers = [
    /*
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
    */
  ]; // empty
  // === Private ===
  // constructor
  function init() {
  }
  // === Start module ===
  init();
  // === Public ===
}]);
