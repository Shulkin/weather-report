angular.module("ol3.map.ctrl", [])
.controller("MapCtrl", ["$timeout", "ol3Map", "Cities",
  function($timeout, ol3Map, Cities) {
  // === Variables ===
  var vm = this;
  // === Private ===
  function showWeatherInfo(data) {
    // $timeout to $apply
    $timeout(function() {
      vm.weatherData = JSON.stringify(data);
    }, 10);
  }
  // constructor
  function init() {
    ol3Map.init({ // config options
      // Primorsky region
      startLocation: [134.6, 45.3]
    });
    ol3Map.loadWeather(Cities.all());
    ol3Map.addClick(showWeatherInfo);
  }
  // === Start module ===
  init();
  // === Public ===
}]);
