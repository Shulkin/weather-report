angular.module("ol3.map.ctrl", [])
.controller("MapCtrl", ["ol3Map", "Cities",
  function(ol3Map, Cities) {
  // === Variables ===
  var vm = this;
  // === Private ===
  // constructor
  function init() {
    ol3Map.init({ // config options
      // Primorsky region
      startLocation: [134.6, 45.3]
    });
    ol3Map.loadWeather(Cities.all());
  }
  // === Start module ===
  init();
  // === Public ===
}]);
