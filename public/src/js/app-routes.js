angular.module("app.routes", []).config(
  ["$stateProvider", "$urlRouterProvider",
  function($stateProvider, $urlRouterProvider) {
    // all other routes will lead to /map
    $urlRouterProvider.otherwise("/map");
    $stateProvider
    .state("map", {
      url: "/map",
      templateUrl: "./views/ol3-map.html",
      controller: "MapCtrl as map"
    });
}]);
