angular.module("weather.data.service", [])
.factory("WeatherData", ["$http", function($http) {
  // === Private ===
  // Examples
  // Get 5d/3h forecast in single city, by city name, in JSON
  // http://api.openweathermap.org/data/2.5/forecast?q=London,us&mode=json&appid=1ba7401f0fd8de8800f868d0400afc44
  // Get 5d/3h forecast in single city, by id, in JSON
  // http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=1ba7401f0fd8de8800f868d0400afc44
  // Get current weather in single city, by id, in JSON
  // http://api.openweathermap.org/data/2.5/weather?id=2172797&appid=1ba7401f0fd8de8800f868d0400afc44
  // Get current weather in many cities, by id, in JSON (max 20 cities)
  // http://api.openweathermap.org/data/2.5/group?id=524901,703448,2643743&units=metric&appid=1ba7401f0fd8de8800f868d0400afc44
  // Get current weather in all cities within bounding box, in JSON (max 50)
  // http://api.openweathermap.org/data/2.5/box/city?bbox=12,32,15,37,10&cluster=yes&appid=1ba7401f0fd8de8800f868d0400afc44
  // === Public ===
  return {
    getWeatherById: function(data) {
      // data - array of places ids
      return $http.post("/api/weather", data).then(function(response) {
        return response.data;
      });
    },
    getForecastById: function(id) {
      // get forecast for single place
      return $http.get("/api/forecast/" + id).then(function(response) {
        return response.data;
      });
    },
    getWeatherIconUrl: function(iconCode) {
      return "http://openweathermap.org/img/w/" + iconCode + ".png";
    }
  };
}]);
