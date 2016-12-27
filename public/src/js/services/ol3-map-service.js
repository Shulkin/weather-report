angular.module("ol3.map.service", [])
.factory("ol3Map", ["Cities", "WeatherData",
  function(Cities, WeatherData) {
  // === Private ===
  var map = {}; // ol.Map
  var defaults = { // options
    zoom: 6,
    // Primorsky region
    startLocation: [134.6, 45.3]
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
    loadWeather: function(data) {
      WeatherData.getWeatherById(Cities.toString(data))
      .then(function(data) {
        // parse JSON response
        var list = data.list;
        var features = []; // empty vector features
        for (var i = 0; i < list.length; i++) {
          var item = list[i];
          // coordinates
          var lat = item.coord.lat;
          var lon = item.coord.lon;
          // weather condition
          var temperature = Math.round(item.main.temp);
          var labelStyle = new ol.style.Style({
            image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
              opacity: 0.9,
              src: WeatherData.getWeatherIconUrl(item.weather[0].icon)
            })),
            text: new ol.style.Text({
              textAlign: "center",
              textBaseline: "middle",
              font: "17px Arial",
              text: item.name,
              fill: new ol.style.Fill({color: "#000000"}),
              stroke: new ol.style.Stroke({color: "#ffffff", width: 2}),
              offsetY: 21
            })
          });
          var temperatureStyle = new ol.style.Style({
            text: new ol.style.Text({
              textAlign: "left",
              textBaseline: "middle",
              font: "17px Arial",
              text: temperature + " °C",
              fill: new ol.style.Fill({color: "#000000"}),
              stroke: new ol.style.Stroke({color: "#ffffff", width: 2}),
              offsetX: 21
            })
          });
          var marker = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.transform([lon, lat], "EPSG:4326", "EPSG:3857")),
          });
          // set multiple styles for city label and temperature
          marker.setStyle([labelStyle, temperatureStyle]);
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
