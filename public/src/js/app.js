var app = angular.module("app", [
  // states router
  "ui.router",
  // app states
  "app.routes",
  // map controller
  "map.ctrl",
  // service to get actual weather data
  "weather.data.service"
]);
