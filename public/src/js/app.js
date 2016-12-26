var app = angular.module("app", [
  // states router
  "ui.router",
  // main config
  "app.config",
  // app states
  "app.routes",
  // map controller
  "ol3.map.ctrl",
  // list of cities
  "cities.service",
  // service to get actual weather data
  "weather.data.service"
]);
