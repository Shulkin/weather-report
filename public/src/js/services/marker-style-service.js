angular.module("marker.style.service", [])
.factory("Marker", [function() {
  // === Public ===
  return {
    getIconStyle: function(iconSrc) {
      return new ol.style.Style({
        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
          opacity: 0.9, src: iconSrc
        }))
      });
    },
    getLabelStyle: function(name) {
      return new ol.style.Style({
        text: new ol.style.Text({
          text: name, font: "17px Arial",
          // place in center line
          textAlign: "center", textBaseline: "middle",
          // black font with white outline
          fill: new ol.style.Fill({color: "#000000"}),
          stroke: new ol.style.Stroke({color: "#ffffff", width: 2}),
          offsetY: 21 // 21px lower than center of icon
        })
      });
    },
    getTemperatureStyle: function(data) {
      return new ol.style.Style({
        text: new ol.style.Text({
          text: data, font: "17px Arial",
          // place in middle-left corner
          textAlign: "left", textBaseline: "middle",
          fill: new ol.style.Fill({color: "#000000"}),
          stroke: new ol.style.Stroke({color: "#ffffff", width: 2}),
          offsetX: 21 // 21px to the left
        })
      });
    }
  };
}]);
