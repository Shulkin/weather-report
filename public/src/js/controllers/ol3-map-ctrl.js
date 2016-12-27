angular.module("ol3.map.ctrl", [])
.controller("MapCtrl", ["ol3Map", "Cities",
  function(ol3Map, Cities) {
  // === Variables ===
  var vm = this;
  // === Private ===
  // constructor
  function init() {
    ol3Map.init({
      // config options
    });
    ol3Map.loadWeather(Cities.all());
  }
  // === Start module ===
  init();
  // === Public ===
  /*
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
  // create new object for custom marker style
  function getMarkerStyle(iconCode) {
    return {image: {icon: {
      // determine anchor units
      anchorXUnits: "fraction", anchorYUnits: "fraction",
      // scale, position and opacity
      scale: 1.0, anchor: [0.5, 0.95], opacity: 0.9,
      // get weather icon for marker style
      src: WeatherData.getWeatherIconUrl(iconCode)
    }}};
  }
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
        // get icon by weather code
        marker.style = getMarkerStyle(marker.weather.icon);
        // push to markers array
        vm.markers.push(marker);
      }
    }, function(err) {
      console.log("Error " + err);
    });
  }
  // === Start module ===
  init();
  // === Public ===
  */
}]);
