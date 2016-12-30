angular.module("ol3.map.service", [
  // style for markers on map
  "marker.style.service",
])
.factory("ol3Map", ["Cities", "WeatherData", "Marker",
  function(Cities, WeatherData, Marker) {
  // === Private ===
  var map = {}; // ol.Map
  var defaults = { // options
    zoom: 6
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
    },
    loadWeather: function(cities) {
      // extract ids from cities array, as we only need them
      WeatherData.getWeatherById({places: Cities.getIds(cities)})
      .then(function(data) {
        console.log("Server response\n" + JSON.stringify(data));
        // parse JSON response
        var list = data.list;
        var features = []; // empty vector features
        for (var i = 0; i < list.length; i++) {
          var item = list[i];
          // coordinates
          var lat = item.coord.lat;
          var lon = item.coord.lon;
          // weather condition
          var marker = new ol.Feature({
            // create marker with corresponding coordinates
            geometry: new ol.geom.Point(ol.proj.transform([lon, lat], "EPSG:4326", "EPSG:3857")),
          });
          // set multiple styles
          marker.setStyle([
            // text label with city name
            Marker.getLabelStyle(item.name),
            // label in left corner for temperature data
            Marker.getTemperatureStyle(Math.round(item.main.temp) + " °C"),
            // weather icon
            Marker.getIconStyle(WeatherData.getWeatherIconUrl(item.weather[0].icon))
          ]);
          features.push(marker);
        }
        var vectorSource = new ol.source.Vector({features: features});
        var vectorLayer = new ol.layer.Vector({source: vectorSource});
        map.addLayer(vectorLayer);
      }, function(err) {
        console.log("Error " + err);
      });
    }
  };
}]);
