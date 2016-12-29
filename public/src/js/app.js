var app = angular.module("app", [
  // states router
  "ui.router",
  // app states
  "app.routes",
  // map controller
  "ol3.map.ctrl",
  // map service
  "ol3.map.service",
  // list of places
  "cities.service",
  // service to get actual weather data
  "weather.data.service"
]);
