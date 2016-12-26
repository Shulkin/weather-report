angular.module("ol3.map.service", [])
.factory("ol3Map", ["Cities", "WeatherData",
  function(Cities, WeatherData) {
  // === Private ===
  var map = {}; // ol.Map
  var defaults = { // options
    zoom: 15,
    startLocation: [0, 40]
  };
  // === Public ===
  return {
    map: map,
    init: function(config) {
      config = angular.extend(defaults, config);
      // create new map
      map = new ol.Map({
        target: "map", // div #map
        layers: [
          new ol.layer.Tile({
            // OpenStreetMap
            source: new ol.source.OSM()
          })
        ],
        view: new ol.View({
          // from WGS84 to Spherical Mercator
          center: ol.proj.transform(config.startLocation, "EPSG:4326", "EPSG:3857"),
          zoom: config.zoom
        })
      });
    }
  };
}]);
