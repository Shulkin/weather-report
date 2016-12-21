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
  vm.layers = []; // empty
  // markers on map
  vm.markers = []; // empty
  // === Private ===
  // constructor
  function init() {
  }
  // === Start module ===
  init();
  // === Public ===
}]);
