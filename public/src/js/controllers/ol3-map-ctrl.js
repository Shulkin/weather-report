angular.module("ol3.map.ctrl", [])
.controller("MapCtrl", ["$timeout", "ol3Map", "Cities", "WeatherData",
  function($timeout, ol3Map, Cities, WeatherData) {
  // === Variables ===
  var vm = this;
  // hide tab with marker info by default
  vm.showMarkerInfo = false;
  // === Private ===
  function showWeatherInfo(data) {
    // $timeout to $apply
    $timeout(function() {
      // show tab if user select any marker
      vm.showMarkerInfo = data.length > 0;
      // parse as JSON in view
      vm.markerInfo = data;
      // necessary to update map size
      $timeout(function() {
        ol3Map.updateSize();
      }, 10);
    }, 10);
  }
  // constructor
  function init() {
    ol3Map.init({ // config options
      // Primorsky region
      startLocation: [134.6, 45.3]
    });
    // load weather markers
    ol3Map.loadWeather(Cities.all());
    // handle lick on map
    ol3Map.addClick(showWeatherInfo);
  }
  // === Start module ===
  init();
  // === Public ===
  // get icon url for weather marker in info tab
  vm.getIcon = WeatherData.getWeatherIconUrl;
}]);
